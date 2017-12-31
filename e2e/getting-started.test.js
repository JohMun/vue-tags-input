import { Selector } from 'testcafe';

fixture `Getting Started`
  .page('http://localhost:3000/#/start');

const lastTag = Selector('.getting-started .vue-tags-input .tags li:last-child span');

test('test basic functions', async t => {
  await t
    .typeText(Selector('.getting-started .vue-tags-input .new-tag-input'), 'e2eTag')
    .pressKey('enter')
    .expect(Selector('.getting-started .vue-tags-input .tags li').count).eql(1)
    .expect(lastTag.innerText).eql('e2eTag');

  // add second tag
  await t
    .typeText(Selector('.getting-started .vue-tags-input .new-tag-input'), 'e2eTag 2')
    .pressKey('enter')
    .expect(Selector('.getting-started .vue-tags-input .tags li').count).eql(2)
    .expect(lastTag.innerText).eql('e2eTag 2');

  // delete first tag
  await t
    .click(Selector('.getting-started .tags:nth-child(1) .actions .delete'))
    .expect(Selector('.getting-started .vue-tags-input .tags li').count).eql(1)
    .expect(lastTag.innerText).eql('e2eTag 2');
});
