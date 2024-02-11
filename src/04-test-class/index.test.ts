// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initBalance = 500;
    const bankAccount = getBankAccount(initBalance);
    expect(bankAccount.getBalance()).toEqual(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(0);
    expect(() => bankAccount.withdraw(10)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bsbBankAccount = getBankAccount(500);
    const belvebBankAccount = getBankAccount(0);
    expect(() => bsbBankAccount.transfer(600, belvebBankAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);
    expect(() => bankAccount.transfer(600, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.deposit(200);
    const balance = bankAccount.getBalance();
    expect(balance).toEqual(300);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.withdraw(50);
    const balance = bankAccount.getBalance();
    expect(balance).toEqual(50);
  });

  test('should transfer money', () => {
    const bsbBankAccount = getBankAccount(500);
    const belvebBankAccount = getBankAccount(0);
    bsbBankAccount.transfer(50, belvebBankAccount);
    const bsbBankBalance = bsbBankAccount.getBalance();
    const belvebBankBalance = bsbBankAccount.getBalance();
    expect(bsbBankBalance).toEqual(450);
    expect(belvebBankBalance).toEqual(450);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    try {
      await bankAccount.synchronizeBalance();
      const balance = bankAccount.getBalance();
      expect(typeof balance).toBe('number');
    } catch (error) {
      console.log(error);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(100);
    try {
      await bankAccount.synchronizeBalance();
      let balance = bankAccount.getBalance();
      expect(typeof balance).toBe('number');

      bankAccount.deposit(50);
      balance = bankAccount.getBalance();
      expect(typeof balance).toBe('number');
    } catch (error) {
      console.log(error);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(100);
    return bankAccount.fetchBalance().catch((error) => {
      console.log(error);
      expect(error).toThrow(SynchronizationFailedError);
    });
  });
});
