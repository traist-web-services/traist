import { useCMS } from 'tinacms'

interface EditLinkInterface {
  className?: string
}

export function EditLink({ className }: EditLinkInterface) {
  const cms = useCMS();
  return (
    <button onClick={() => cms.toggle()} className={className}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
}