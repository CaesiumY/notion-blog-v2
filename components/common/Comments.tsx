import Giscus from "@giscus/react";
import React from "react";

const Comments = () => {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-8">
        <Giscus
          repo="caesiumy/notion-blog-v2"
          repoId="R_kgDOJMXaKQ"
          category="giscus"
          categoryId="DIC_kwDOJMXaKc4CWCkT"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light_protanopia"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Comments;
