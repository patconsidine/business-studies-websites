type YouTubeEmbedProps = {
  id: string;
  title?: string;
};

/** Embed a public YouTube video (use for syllabus-safe, linkable clips). */
export function YouTubeEmbed({ id, title = "Video" }: YouTubeEmbedProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {title ? <figcaption className="bg-white px-4 py-2 text-sm text-slate-600">{title}</figcaption> : null}
    </figure>
  );
}

type LessonImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

/** Image from /public/images/... — add files under apps/year11/public/images/ */
export function LessonImage({ src, alt, caption }: LessonImageProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full object-cover" />
      {caption ? <figcaption className="px-4 py-2 text-sm text-slate-600">{caption}</figcaption> : null}
    </figure>
  );
}
