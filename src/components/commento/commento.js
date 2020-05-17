import React, { useEffect } from 'react'

const COMMENTO_SCRIPT_ID = 'commento-script'
const COMMENTO_SRC = 'https://cdn.commento.io/js/commento.js'

const getCommentoScript = () => {
  return document.getElementById(COMMENTO_SCRIPT_ID)
}

export const Commento = ({ id }) => {
  useEffect(() => {
    let commentoElement = getCommentoScript()

    if (!commentoElement) {
      commentoElement = document.createElement('script')

      commentoElement.id = COMMENTO_SCRIPT_ID
      commentoElement.src = COMMENTO_SRC
      commentoElement.defer = true
      commentoElement.dataset.noFonts = true;
      commentoElement.dataset.pageId = id;

      document.body.appendChild(commentoElement)
    }

    return () => {
      if (commentoElement) {
        commentoElement.outerHTML = ''
      }
    }
  }, [])

  return <div id="commento" />
}
