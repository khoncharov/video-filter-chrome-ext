/* eslint-disable import/prefer-default-export */
import { BADGE_BG_COLOR, BADGE_TEXT_OFF, BADGE_TEXT_ON } from '../constants';
import appState from '../services/app-state';

export const updateTabBadge = () => {
  const { tabId } = appState;
  if (tabId !== null) {
    if (appState.filterApplied) {
      chrome.action.setBadgeText({ tabId, text: BADGE_TEXT_ON });
      chrome.action.setBadgeBackgroundColor({ tabId, color: BADGE_BG_COLOR });
    } else {
      chrome.action.setBadgeText({ tabId, text: BADGE_TEXT_OFF });
    }
  }
};
