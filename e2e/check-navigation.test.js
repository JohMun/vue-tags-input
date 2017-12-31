import { Selector, ClientFunction } from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);

fixture `Getting Started`
  .page('http://localhost:3000');

test('Move to page "Getting Started"', async t => {
  await t
    .click(Selector('.el-navbar .nav-items li').withText('Getting Started'));

  await t
    .expect(Selector('main .page-content h1').innerText).eql('Getting Started')
    .expect(getLocation()).contains('start');
});
