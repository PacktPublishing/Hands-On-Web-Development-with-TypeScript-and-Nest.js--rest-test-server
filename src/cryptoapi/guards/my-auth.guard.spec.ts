import { MyAuthGuard } from './my-auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new MyAuthGuard()).toBeDefined();
  });
});
