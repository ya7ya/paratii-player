import { TAPi18n } from 'meteor/tap:i18n'

export function log (message) {
  if (Meteor.settings.public.isTestEnv) {
    console.log(message)
  }
}

export function formatNumber (number) {
  if (!number) {
    return false
  }
  const parts = number.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return parts.join('.')
}

export function formatCoinBalance (balance = 0) {
  return parseFloat(balance).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  )
}

export function strip0x (input) {
  if (typeof (input) !== 'string') {
    return input
  } else if (input.length >= 2 && input.slice(0, 2) === '0x') {
    return input.slice(2)
  }
  return input
}

export function add0x (input) {
  if (typeof (input) !== 'string') {
    return input
  } else if (input.length < 2 || input.slice(0, 2) !== '0x') {
    return `0x${input}`
  }
  return input
}

// Show & hide Modal
export function showModal (templateName, options = null) {
  Session.set('modalContentTemplate', templateName)
  Session.set('modalOptions', options)
  Modal.show('mainModal', options, {backdrop: 'static'})
}

export function hideModal (template) {
  if (!template || Session.get('modalContentTemplate') === template) {
    Modal.hide()
    Session.set('modalContentTemplate', null)
  }
}

// Manage errors on Alerts
export function showGlobalAlert (message, style) {
  Session.set('globalAlertClass', style)
  Session.set('globalAlertMessage', message)
  Meteor.setTimeout(() => {
    Session.set('globalAlertShow', 'show')
  }, 100)
}

export function hideGlobalAlert () {
  Session.set('globalAlertShow', '')
  Meteor.setTimeout(() => {
    Session.set('globalAlertMessage', null)
  }, 600)
}

export function showModalAlert (message, style) {
  Session.set('modalAlertClass', style)
  Session.set('modalAlertMessage', message)
  Meteor.setTimeout(() => {
    Session.set('modalAlertShow', 'show')
  }, 100)
}

export function hideModalAlert () {
  Session.set('modalAlertShow', '')
  Meteor.setTimeout(() => {
    Session.set('modalAlertMessage', null)
  }, 600)
}

export function resetAlert () {
  Session.set('globalAlertShow', null)
  Session.set('globalAlertMessage', null)
  Session.set('modalAlertShow', null)
  Session.set('modalAlertMessage', null)
}

export function removeTrailingSlash (str) {
  return str.replace(/\/$/, '')
}

export function __ (message) {
  return TAPi18n.__(message)
}

// export function setModalState (message) {
//   Session.set('modalStateMessage', message)
// }

// change password type
export function changePasswordType () {
  let inputType = (Session.get('passwordType') === 'password') ? 'text' : 'password'
  Session.set('passwordType', inputType)
}

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
