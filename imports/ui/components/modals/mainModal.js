import './mainModal.html'
import '/imports/ui/components/alert/modalAlert.js'

Template.mainModal.onCreated(function () {
  // Set template
  // Session.set('contentTemplate', this.data.contentTemplate)
  // Session.set('wrapperClass', this.data.wrapperClass)
  // Set options in a reactive var
  // this.options = new ReactiveVar()
  // this.options.set(this.data)

  Meteor.setTimeout(() => $('div.main-modal').addClass('show-content'), 850)
})

Template.mainModal.helpers({
  contentTemplate: () => Session.get('contentTemplate'),
  options: () => Session.get('modalOptions'),
  wrapperClass: () => Session.get('modalOptions').wrapperClass,
  blocking: () => Session.get('modalOptions').blocking
})
