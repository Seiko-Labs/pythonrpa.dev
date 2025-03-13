import type { Account } from "@prisma/client";
import { prisma } from "@/backend/db";
import { config } from "@/backend/config";
import type { Options } from "argon2";
import { hash, verify } from "argon2";
import { CreateAccountInput } from "./types";

// Trading off compute for memory usage with enough security per OWASP's recommendations
// 7MiB of memory, 4 iterations, 1 thread. Includes a secret (pepper) to prevent side-channel attacks.
const argonOptions: Options = {
  secret: Buffer.from(config.ARGON2_SECRET, "utf8"),
  memoryCost: 1024 * 7,
  timeCost: 4,
  parallelism: 1,
};

export class AccountRepository {
  constructor(private account: Account) {}

  static async create(input: CreateAccountInput): Promise<AccountRepository> {
    const hashedPassword = await hash(input.password, argonOptions);

    const data = await prisma.account.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email.toLowerCase().trim(),
        password: hashedPassword,
        whatsapp: input.whatsapp,
        country: input.country,
        companyName: input.companyName,
        currentRole: input.currentRole,
        preferredCommunicationLanguage: input.preferredCommunicationLanguage,
        intendedUse: input.intendedUse,
        comments: input.comments,
      },
    });

    return new AccountRepository(data);
  }

  get id(): string {
    return this.account.id;
  }

  get email(): string {
    return this.account.email;
  }

  get firstName(): string {
    return this.account.firstName;
  }

  get lastName(): string {
    return this.account.lastName;
  }

  get fullName(): string {
    // keep the opportunity to add more complicated logic later
    return `${this.firstName} ${this.lastName}`;
  }

  get isAdmin(): boolean {
    return this.account.isAdmin;
  }

  static async findByEmail(email: string): Promise<AccountRepository | null> {
    const data = await prisma.account.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    return data ? new AccountRepository(data) : null;
  }

  static async findById(id: string): Promise<AccountRepository | null> {
    const data = await prisma.account.findUnique({ where: { id } });
    return data ? new AccountRepository(data) : null;
  }

  static async findManyByIds(ids: string[]): Promise<AccountRepository[]> {
    const data = await prisma.account.findMany({ where: { id: { in: ids } } });
    return data.map((account) => new AccountRepository(account));
  }

  async verifyPassword(password: string): Promise<boolean> {
    if (!this.account.password) {
      return false;
    }

    return verify(this.account.password, password, argonOptions);
  }

  /**
   * Updates the account email
   */
  async setEmail(email: string): Promise<void> {
    void (await prisma.account.update({
      where: { id: this.account.id },
      data: { email },
    }));

    this.account.email = email;
  }

  /**
   * Updates the account password
   * @param password - Plain text password
   */
  async setPassword(password: string): Promise<void> {
    const passwordHash = await hash(password, argonOptions);

    void (await prisma.account.update({
      where: { id: this.account.id },
      data: { password: passwordHash },
    }));

    this.account.password = passwordHash;
  }

  async destroy(): Promise<void> {
    await prisma.account.delete({ where: { id: this.account.id } });
  }
}
