import TextNode from "@/components/nodes/TextNode";
import ImageNode from "@/components/nodes/ImageNode";
import LLMNode from "@/components/nodes/LLMNode";

export const nodeTypes = {
  text: TextNode,
  image: ImageNode,
  llm: LLMNode,
  video: TextNode,
  crop: TextNode,
  frame: TextNode,
};