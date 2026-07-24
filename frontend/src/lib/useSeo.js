import { useEffect } from "react";

export const useSeo = (title, description) => {
  useEffect(() => {
    if (title) document.title = `${title} | NBMT Trading Co.`;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
    window.scrollTo(0, 0);
  }, [title, description]);
};
