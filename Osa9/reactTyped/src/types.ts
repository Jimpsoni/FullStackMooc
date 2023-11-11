interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
  
interface CourseWithDescription extends CoursePartBase {
  description: string;
}
  
interface CoursePartBasic extends CoursePartBase, CourseWithDescription {
  kind: "basic";
}
  
interface CoursePartSpecial extends CoursePartBase, CourseWithDescription {
  requirements: string[];
  kind: "special"
}
  
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}
  
interface CoursePartBackground extends CoursePartBase, CourseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export default "default export..."
  