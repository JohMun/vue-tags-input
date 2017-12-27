import { Selector } from 'testcafe';

fixture `Getting Started`
  .page('http://localhost:3000');

test('Add new Tag', async t => {
  await t
    .typeText(Selector('.getting-started .vue-tags-input .new-tag'), 'e2eTag')
    .pressKey('enter')
    .expect(Selector('.getting-started .vue-tags-input .tags li').count).eql(2);

  const lastTag = Selector('.getting-started .vue-tags-input .tags li:last-child span');
  await t
    .expect(lastTag.innerText).eql('e2eTag')
    .wait(4000);
});
