import { BiosysClientTwoPage } from './app.po';

describe('biosys-client-two App', () => {
  let page: BiosysClientTwoPage;

  beforeEach(() => {
    page = new BiosysClientTwoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
