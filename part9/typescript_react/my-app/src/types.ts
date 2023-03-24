interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartBasic extends CoursePartDescription {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDescription {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic |
                          CoursePartGroup |
                          CoursePartBackround |
                          CoursePartRequirements;


