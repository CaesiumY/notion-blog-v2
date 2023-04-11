import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import TagList from "../card/tag/TagList";

interface TagContainerProps {
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

const TagContainer = ({ tags }: TagContainerProps) => {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto bg-gray-100 rounded-2xl my-8">
        <TagList tags={tags} />
      </div>
    </section>
  );
};

export default TagContainer;
