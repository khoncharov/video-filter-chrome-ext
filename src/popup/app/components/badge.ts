/* eslint-disable import/prefer-default-export */
import AppStateService from '../services/app-state';
import { BADGE_BG_COLOR, BADGE_TEXT_OFF, BADGE_TEXT_ON } from '../constants';

export const updateTabBadge = (appState: AppStateService) => {
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
