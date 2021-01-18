import { useCMS } from "tinacms";

interface Props {
  className?: string;
}

const EditLink = ({ className }: Props) => {
  const cms = useCMS();
  return (
    <button onClick={() => cms.toggle()} className={className}>
      {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
};

export default EditLink;
