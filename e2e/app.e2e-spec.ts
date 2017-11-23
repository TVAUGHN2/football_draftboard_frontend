import { FfDashboardAppPage } from './app.po';

describe('ff-dashboard-app App', () => {
  let page: FfDashboardAppPage;

  beforeEach(() => {
    page = new FfDashboardAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
