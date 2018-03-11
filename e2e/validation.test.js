import { Selector } from 'testcafe';

fixture `Getting Started`
  .page('http://localhost:3000/#/e2e-suite/validation');

test('Test validation', async t => {


  /*** check autocomplete items ***/

  await t
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'i')
    /* does the autocomplete show corect amount of items */
    .expect(Selector('.tags-input-1 .autocomplete li').count).eql(3);

  await t
    /* does the first item has the class no-numbers */
    .expect(
      Selector('.tags-input-1 .autocomplete li:nth-child(1)').hasClass('no-numbers')
    ).eql(true)
    /* does the first item has the class invalid */
    .expect(
      Selector('.tags-input-1 .autocomplete li:nth-child(1)').hasClass('invalid')
    ).eql(true)
    /* does the first item has not the class valid */
    .expect(Selector('.tags-input-1 .autocomplete li:nth-child(1)').hasClass('valid')).eql(false);

  await t
    /* does the second item has the class valid */
    .expect(Selector('.tags-input-1 .autocomplete li:nth-child(2)').hasClass('valid')).eql(true);

  await t
    /* does the third item has the class no-braces */
    .expect(Selector('.tags-input-1 .autocomplete li:nth-child(3)').hasClass('no-braces')).eql(true)
    /* does the third item has the class invalid */
    .expect(
      Selector('.tags-input-1 .autocomplete li:nth-child(3)').hasClass('invalid')
    ).eql(true);

  /* has item with text "Cannot be added" all expected classes */
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .pressKey('ctrl+a delete')
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'Cannot')
    .expect(Selector('.tags-input-1 .autocomplete li').count).eql(1)
    .expect(
      Selector('.tags-input-1 .autocomplete li:nth-child(1)').hasClass('avoid-item')
    ).eql(true)
    .expect(
      Selector('.tags-input-1 .autocomplete li:nth-child(1)').hasClass('invalid')
    ).eql(true);

  /*Is it imbossible to add the item with text "Cannot be added" via click (disableAdd = true)*/
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .expect(Selector('.tags-input-1 .tags li').count).eql(1);


  /*** check new-tags-input ***/

  /*Is it imbossible to add the item with text "Cannot be added" via enter (disableAdd = true)*/
  await t
    .typeText(Selector('.tags-input-1 .new-tag-input'), ' be added')
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('avoid-item')).eql(true)
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('invalid')).eql(true)
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li').count).eql(1);

  /*Is it imbossible to add the item with text "Cannot be added" via paste (disableAdd = true)*/
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .pressKey('ctrl+a delete')
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'Cannot be added', { paste: true })
    .expect(Selector('.tags-input-1 .tags li').count).eql(1);

  /*Is it imbossible to add the item with text "Cannot be added" via blur (disableAdd = true)*/
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .click(Selector('.validation'))
    .expect(Selector('.tags-input-1 .tags li').count).eql(1);

  /* does a short text input has the class min-length */
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .pressKey('ctrl+a delete')
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'short')
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('invalid')).eql(true)
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('min-length')).eql(true)
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li').count).eql(2);

  /* does a duplicate input has the class duplicate */
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .pressKey('ctrl+a delete')
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'short')
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('invalid')).eql(true)
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('duplicate')).eql(true);

  /* does the input gets the classes min-length, no-braces, no-numbers in combination */
  await t
    .typeText(Selector('.tags-input-1 .new-tag-input'), '8{')
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('min-length')).eql(true)
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('no-braces')).eql(true)
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('no-numbers')).eql(true)
    .typeText(Selector('.tags-input-1 .new-tag-input'), '6')
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('min-length')).eql(false);

  /* is it possible to make a valid input */
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .pressKey('ctrl+a delete')
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'this is valid tag')
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('valid')).eql(true)
    .expect(Selector('.tags-input-1 .new-tag-input').hasClass('invalid')).eql(false);


  /*** check tags ***/

  /* does duplicate tags have the class duplicate */
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li:nth-child(2)').hasClass('valid')).eql(true)
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'this is valid tag')
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li:nth-child(2)').hasClass('duplicate')).eql(true)
    .expect(Selector('.tags-input-1 .tags li:nth-child(2)').hasClass('invalid')).eql(true)
    .expect(Selector('.tags-input-1 .tags li:nth-child(3)').hasClass('duplicate')).eql(true)
    .expect(Selector('.tags-input-1 .tags li:nth-child(3)').hasClass('invalid')).eql(true);

  /* does duplicate tags lose the class duplicate when chaning one */
  await t
    .click(Selector('.tags-input-1 .tags li:nth-child(2)'))
    .click(Selector('.tags-input-1 .tags li:nth-child(2) input'))
    .pressKey('backspace')
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li:nth-child(2)').hasClass('duplicate')).eql(false)
    .expect(Selector('.tags-input-1 .tags li:nth-child(2)').hasClass('invalid')).eql(false)
    .expect(Selector('.tags-input-1 .tags li:nth-child(3)').hasClass('duplicate')).eql(false)
    .expect(Selector('.tags-input-1 .tags li:nth-child(3)').hasClass('invalid')).eql(false);

  /* does the first tag has the class min-length */
  await t
    .expect(Selector('.tags-input-1 .tags li:nth-child(1)').hasClass('min-length')).eql(true);

  /* does the first tag lose the class min-length when chaning */
  await t
    .click(Selector('.tags-input-1 .tags li:nth-child(1)'))
    .typeText(Selector('.tags-input-1 .tags li:nth-child(1) input'), ' and now longer')
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li:nth-child(1)').hasClass('valid')).eql(true)
    .expect(Selector('.tags-input-1 .tags li:nth-child(1)').hasClass('min-length')).eql(false)
    .expect(Selector('.tags-input-1 .tags li:nth-child(1)').hasClass('invalid')).eql(false);

  /* does a added tag with text "valid tag but }" has the class no-braces */
  await t
    .click(Selector('.tags-input-1 .new-tag-input'))
    .typeText(Selector('.tags-input-1 .new-tag-input'), 'valid tag but }')
    .pressKey('enter')
    .expect(Selector('.tags-input-1 .tags li:nth-child(4)').hasClass('no-braces')).eql(true)
    .expect(Selector('.tags-input-1 .tags li:nth-child(4)').hasClass('min-length')).eql(false)
    .expect(Selector('.tags-input-1 .tags li:nth-child(4)').hasClass('no-numbers')).eql(false)
    .expect(Selector('.tags-input-1 .tags li:nth-child(4)').hasClass('invalid')).eql(true);
});
