// ==UserScript==
// @name         YouTube - Open Video in New Tab (Left Click)
// @namespace    https://tampermonkey.net/
// @version      1.2
// @description  Force YouTube video clicks to open in a new tab (like Bilibili). Keeps feed/search page intact.
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // Open target url in a new tab and (optionally) focus it
  function openInNewTab(url) {
    if (!url) return;
    // Normalize relative URLs
    const full = url.startsWith('http') ? url : new URL(url, location.origin).toString();
    window.open(full, '_blank', 'noopener,noreferrer');
  }

  // Extract actual href from YouTube elements (thumbnail/title)
  function findVideoHref(startEl) {
    if (!startEl) return null;

    // If click is on/within an anchor, prefer that
    const a = startEl.closest && startEl.closest('a');
    if (a && a.href) return a.href;

    // Sometimes YouTube uses custom elements; scan nearby anchors
    const container = startEl.closest && startEl.closest('ytd-rich-grid-media, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer, ytd-playlist-video-renderer, ytd-reel-item-renderer');
    if (container) {
      const aa = container.querySelector('a#thumbnail[href], a#video-title[href], a[href*="/watch"], a[href*="/shorts/"]');
      if (aa && aa.href) return aa.href;
    }

    return null;
  }

  // Decide if this click should be intercepted
  function shouldIntercept(e, href) {
    if (!href) return false;

    // Only intercept video/shorts links
    const u = new URL(href, location.origin);
    const isVideo = u.pathname === '/watch' || u.pathname.startsWith('/shorts');
    if (!isVideo) return false;

    // Respect user intent: middle click, right click, modifier keys should behave normally
    if (e.button !== 0) return false; // left click only
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;

    // Don't break clicks inside input/textarea or when selecting text
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea') return false;

    // If user is dragging/selection, ignore
    const sel = window.getSelection && window.getSelection();
    if (sel && String(sel).trim().length > 0) return false;

    return true;
  }

  // Capture phase to beat YouTube's SPA router handlers
  window.addEventListener('click', function (e) {
    const href = findVideoHref(e.target);
    if (!shouldIntercept(e, href)) return;

    // Stop YouTube from handling the click
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    openInNewTab(href);
  }, true);

  // Optional: show a tiny hint cursor on video links (purely cosmetic)
  try {
    GM_addStyle(`
      ytd-rich-grid-media a#thumbnail, ytd-rich-grid-media a#video-title,
      ytd-video-renderer a#thumbnail, ytd-video-renderer a#video-title,
      ytd-compact-video-renderer a#thumbnail, ytd-compact-video-renderer a#video-title {
        cursor: alias !important;
      }
    `);
  } catch (_) {}
})();
