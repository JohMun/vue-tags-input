import { Selector } from 'testcafe';

fixture `Check if vue-tags-input hooks work`
  .page('http://localhost:3000/#/e2e-suite/hooks');

test('test all hooks', async t => {


  /*** check before-adding-tag hook ***/

  // enter tag -> actions should be visible
  const enterTag = async () => {
    await t
      .typeText(Selector('.hooks .new-tag-input'), 'tag')
      .pressKey('enter')
      .expect(Selector('.hooks > .actions').exists).eql(true)
      .expect(Selector('.hooks .tags').count).eql(1)
      .expect(Selector('.hooks .new-tag-input').value).eql('tag');
  };

  // cancel adding -> input shouldnt be a tag
  await enterTag();
  await t
    .click(Selector('.actions .cancel'))
    .expect(Selector('.hooks > .actions').exists).eql(false)
    .expect(Selector('.hooks .tags').count).eql(1)
    .expect(Selector('.hooks .new-tag-input').value).eql('');

  // perform adding -> input should become a tags
  await enterTag();
  await t
    .click(Selector('.actions .perform'))
    .expect(Selector('.hooks > .actions').exists).eql(false)
    .expect(Selector('.hooks .tags li').count).eql(2)
    .expect(Selector('.hooks .new-tag-input').value).eql('');


  /*** check before-editing-tag hook ***/

  // edit tag -> actions should be visible
  const editTag = async () => {
    await t
      .click(Selector('.hooks .tags li:nth-child(1)'))
      .expect(Selector('.hooks > .actions').exists).eql(true)
      .expect(Selector('.hooks .tags:nth-child(1) .tag-input').exists).eql(false);
  };

  // cancel edit
  await editTag();
  await t
    .click(Selector('.actions .cancel'))
    .expect(Selector('.hooks > .actions').exists).eql(false)
    .expect(Selector('.hooks .tags li:nth-child(1) .tag-input').exists).eql(false);

  // perform edit
  await editTag();
  await t
    .click(Selector('.actions .perform'))
    .expect(Selector('.hooks > .actions').exists).eql(false)
    .expect(Selector('.hooks .tags li:nth-child(1) .tag-input').exists).eql(true);


  /*** check before-saving-tag hook ***/

  // do some changes and save
  const saveChanges = async () => {
    await t
      .pressKey('ctrl+a delete')
      .typeText(Selector('.hooks .tags li:nth-child(1)'), 'changed')
      .pressKey('enter')
      .expect(Selector('.hooks .tags li:nth-child(1) .tag-input').exists).eql(true)
      .expect(Selector('.hooks > .actions').exists).eql(true);
  };

  // cancel save
  await saveChanges();
  await t
    .click(Selector('.actions .cancel'))
    .expect(Selector('.hooks .tags li:nth-child(1) span').textContent).eql('tag')
    .expect(Selector('.hooks > .actions').exists).eql(false)
    .expect(Selector('.hooks .tags li:nth-child(1) .tag-input').exists).eql(false);

  // perform save
  await t
    .click(Selector('.hooks .tags li:nth-child(1)'))
    .click(Selector('.actions .perform'));

  await saveChanges();
  await t
    .click(Selector('.actions .perform'))
    .expect(Selector('.hooks .tags li:nth-child(1) span').textContent).eql('changed')
    .expect(Selector('.hooks > .actions').exists).eql(false)
    .expect(Selector('.hooks .tags li:nth-child(1) .tag-input').exists).eql(false);


  /*** check before-deleting-tag hook ***/
  const deleteTag = async () => {
    await t
      .click(Selector('.hooks .tags li:nth-child(1) .icon-close'))
      .expect(Selector('.hooks .tags li').count).eql(2);
  };

  // cancel delete
  await deleteTag();
  await t
    .click(Selector('.actions .cancel'))
    .expect(Selector('.hooks .tags li').count).eql(2)
    .expect(Selector('.hooks > .actions').exists).eql(false);

  // perform delete
  await deleteTag();
  await t
    .click(Selector('.actions .perform'))
    .expect(Selector('.hooks .tags li').count).eql(1)
    .expect(Selector('.hooks > .actions').exists).eql(false);
});
