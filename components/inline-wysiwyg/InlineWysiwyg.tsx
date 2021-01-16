import { useEffect, useState } from 'react'
import { useCMS } from 'tinacms'

export function InlineWysiwyg(props, children, ...rest) {
  const cms = useCMS()
  const [{ InlineWysiwyg }, setEditor] = useState({})

  useEffect(() => {
    if (!InlineWysiwyg && cms.enabled) {
      import('react-tinacms-editor').then(setEditor)
    }
  }, [cms.enabled])

  if (InlineWysiwyg) {
    return (
      <InlineWysiwyg sticky={props.sticky ? props.sticky : 'var(--tina-toolbar-height)'} {...props}/>
    )
  }

  return props.children
}