import { useEffect, useState } from 'react'
import { useCMS } from 'tinacms'

interface Props {
  sticky?: boolean|string,
  children?: any,
  name: string,
  format: 'markdown'|'html'
}

export function InlineWysiwyg(props:Props) {
  const cms = useCMS()
  const [{ InlineWysiwyg }, setEditor]:[any, any] = useState({
    InlineWysiwyg: null
  })

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