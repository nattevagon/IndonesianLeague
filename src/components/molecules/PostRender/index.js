import DOMPurify from "dompurify";

const alignmentClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export default function PostRender({ content }) {
  return (
    <div className="space-y-4 prose dark:prose-invert max-w-none content-render">
      {content?.blocks?.map((block, i) => {
        switch (block.type) {
          case "header": {
            const Tag = `h${block?.data?.level}`;
            return (
              <Tag
                key={i}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(block?.data?.text || ""),
                }}
              />
            );
          }
          case "paragraph": {
            const align = alignmentClass[block?.data?.alignment] || "text-left";
            const text = block?.data?.text?.trim();

            return (
              <p
                key={i}
                className={align}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    text ? block?.data?.text : "&nbsp;"
                  ),
                }}
              />
            );
          }
          case "list":
            return (
              <ul key={i} className="list-disc list-inside">
                {block?.data?.items?.map((item, j) => (
                  <li
                    key={j}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item),
                    }}
                  />
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 pl-4 italic"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(block?.data?.text || ""),
                }}
              />
            );
          case "image": {
            const { file, caption, withBorder, withBackground, stretched } = block?.data || {};
            const classNames = [
              "rounded-lg object-contain",
              withBorder ? "border" : "",
              withBackground ? "bg-gray-100 p-2" : "",
              stretched ? "w-full" : "max-h-96",
              !stretched ? "max-w-3xl mx-auto" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <figure key={i} className="text-center">
                <img
                  src={file?.url}
                  alt={caption || ""}
                  className={classNames}
                />
                {caption && (
                  <figcaption className="text-sm text-primary-black dark:text-primary-white mt-1">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
