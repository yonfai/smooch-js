'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.AppStateReducer = AppStateReducer;

var _appStateActions = require('../actions/app-state-actions');

var AppStateActions = _interopRequireWildcard(_appStateActions);

var _commonActions = require('../actions/common-actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INITIAL_STATE = {
    settingsVisible: false,
    settingsNotificationVisible: false,
    widgetOpened: null,
    settingsEnabled: true,
    soundNotificationEnabled: true,
    imageUploadEnabled: true,
    readOnlyEmail: false,
    embedded: false,
    serverURL: 'https://api.smooch.io/',
    errorNotificationMessage: null
};

function AppStateReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_STATE : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case _commonActions.RESET:
            return (0, _assign2.default)({}, INITIAL_STATE);

        case AppStateActions.ENABLE_SETTINGS:
            return (0, _assign2.default)({}, state, {
                settingsEnabled: true
            });

        case AppStateActions.DISABLE_SETTINGS:
            return (0, _assign2.default)({}, state, {
                settingsEnabled: false
            });

        case AppStateActions.ENABLE_IMAGE_UPLOAD:
            return (0, _assign2.default)({}, state, {
                imageUploadEnabled: true
            });

        case AppStateActions.DISABLE_IMAGE_UPLOAD:
            return (0, _assign2.default)({}, state, {
                imageUploadEnabled: false
            });

        case AppStateActions.ENABLE_SOUND_NOTIFICATION:
            return (0, _assign2.default)({}, state, {
                soundNotificationEnabled: true
            });

        case AppStateActions.DISABLE_SOUND_NOTIFICATION:
            return (0, _assign2.default)({}, state, {
                soundNotificationEnabled: false
            });

        case AppStateActions.SET_EMAIL_READONLY:
            return (0, _assign2.default)({}, state, {
                readOnlyEmail: true
            });

        case AppStateActions.UNSET_EMAIL_READONLY:
            return (0, _assign2.default)({}, state, {
                readOnlyEmail: false
            });

        case AppStateActions.TOGGLE_WIDGET:
            return (0, _assign2.default)({}, state, {
                widgetOpened: !state.widgetOpened,
                settingsVisible: state.settingsVisible && !state.widgetOpened
            });

        case AppStateActions.OPEN_WIDGET:
            return (0, _assign2.default)({}, state, {
                widgetOpened: true
            });
        case AppStateActions.CLOSE_WIDGET:
            return (0, _assign2.default)({}, state, {
                widgetOpened: false,
                settingsVisible: false
            });
        case AppStateActions.SHOW_SETTINGS:
            return (0, _assign2.default)({}, state, {
                settingsVisible: true
            });
        case AppStateActions.HIDE_SETTINGS:
            return (0, _assign2.default)({}, state, {
                settingsVisible: false
            });
        case AppStateActions.SHOW_SETTINGS_NOTIFICATION:
            return (0, _assign2.default)({}, state, {
                settingsNotificationVisible: true
            });
        case AppStateActions.HIDE_SETTINGS_NOTIFICATION:
            return (0, _assign2.default)({}, state, {
                settingsNotificationVisible: false
            });
        case AppStateActions.SET_SERVER_URL:
            return (0, _assign2.default)({}, state, {
                serverURL: action.url
            });
        case AppStateActions.SHOW_ERROR_NOTIFICATION:
            return (0, _assign2.default)({}, state, {
                settingsNotificationVisible: false,
                errorNotificationMessage: action.message
            });
        case AppStateActions.HIDE_ERROR_NOTIFICATION:
            return (0, _assign2.default)({}, state, {
                settingsNotificationVisible: false,
                errorNotificationMessage: null
            });
        case AppStateActions.SET_EMBEDDED:
            return (0, _assign2.default)({}, state, {
                embedded: action.value,
                widgetOpened: action.value ? true : state.widgetOpened
            });
        default:
            return state;
    }
}