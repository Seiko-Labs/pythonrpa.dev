import { TrialStatus, type Trial } from "@prisma/client";
import { ActivateTrialInput } from "./types";
import { prisma } from "@/backend/db";

const TRIAL_DURATION_DAYS = 14;

export class TrialsRepository {
  constructor(private trial: Trial) {}

  /**
   * Creates a new trial for the specified account.
   * @param input - The input containing the account ID.
   * @returns A new TrialsRepository instance for the created trial.
   * @throws Error if the account does not exist.
   */
  static async create(input: ActivateTrialInput): Promise<TrialsRepository> {
    // Verify that the account exists
    const account = await prisma.account.findUnique({
      where: { id: input.accountId },
    });
    if (!account) {
      throw new Error(`Account with id ${input.accountId} not found`);
    }

    // Create the trial record
    const data = await prisma.trial.create({
      data: {
        accountId: input.accountId,
        startDate: new Date(),
        endDate: new Date(
          Date.now() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000
        ),
        status: TrialStatus.ACTIVE,
      },
    });

    return new TrialsRepository(data);
  }

  /**
   * Retrieves a trial by its ID.
   * @param id - The ID of the trial to retrieve.
   * @returns A TrialsRepository instance if the trial exists, otherwise null.
   */
  static async getById(id: string): Promise<TrialsRepository | null> {
    const trial = await prisma.trial.findUnique({ where: { id } });
    return trial ? new TrialsRepository(trial) : null;
  }

  /**
   * Retrieves all trials associated with a specific account.
   * @param accountId - The ID of the account.
   * @returns An array of TrialsRepository instances for the account's trials.
   */
  static async getByAccountId(accountId: string): Promise<TrialsRepository[]> {
    const trials = await prisma.trial.findMany({ where: { accountId } });
    return trials.map((trial) => new TrialsRepository(trial));
  }

  /**
   * Updates the trial with the provided data.
   * @param data - The partial trial data to update.
   * @returns The updated trial data.
   */
  async update(data: Partial<Trial>): Promise<Trial> {
    const updatedTrial = await prisma.trial.update({
      where: { id: this.trial.id },
      data,
    });
    this.trial = updatedTrial; // Keep the instance in sync with the database
    return updatedTrial;
  }

  /**
   * Deletes the trial from the database.
   */
  async delete(): Promise<void> {
    await prisma.trial.delete({ where: { id: this.trial.id } });
  }

  /**
   * Checks if the trial is currently active.
   * @returns True if the trial is active and within the start and end dates, otherwise false.
   */
  isActive(): boolean {
    const now = new Date();
    return (
      this.trial.status === TrialStatus.ACTIVE &&
      now >= this.trial.startDate &&
      now <= this.trial.endDate
    );
  }

  /**
   * Gets the trial data managed by this repository instance.
   * @returns The trial data.
   */
  get trialData(): Trial {
    return this.trial;
  }
}
