import { useEffect, useState } from "react";
import { useCMS } from "tinacms";

interface Props {
  sticky?: boolean | string;
  children?: any;
  name: string;
  format: "markdown" | "html";
  imageProps?: {
    uploadDir: () => string;
    parse: (media: any) => string;
    previewSrc: (src: string) => Promise<string>;
  };
}

const InlineWysiwyg = (props: Props) => {
  const cms = useCMS();
  const [{ InlineWysiwyg }, setEditor]: [any, any] = useState({});

  useEffect(() => {
    if (!InlineWysiwyg && cms.enabled) {
      import("react-tinacms-editor").then(setEditor);
    }
  }, [cms.enabled]);

  if (InlineWysiwyg) {
    return <InlineWysiwyg {...props} sticky="62px" />;
  }

  return props.children;
};

export default InlineWysiwyg;
