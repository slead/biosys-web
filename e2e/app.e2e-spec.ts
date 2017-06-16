import { BiosysClientPage } from './app.po';


describe('biosys-client App', () => {
  let page: BiosysClientPage;

  beforeEach(() => {
    page = new BiosysClientPage();
  });

  it('should display welcome message', () => {
    BiosysClientPage.navigateTo();
    expect(BiosysClientPage.getParagraphText()).toEqual('Welcome to Biosys');
  });
});
