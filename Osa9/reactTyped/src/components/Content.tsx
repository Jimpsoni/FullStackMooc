import { CoursePart } from "../types"

interface PartTypes {
    content: CoursePart
}

interface ContentTypes {
    content: CoursePart[]
}


const Part = (prop: PartTypes) => {
  const content = prop.content
  let componentContent;
  switch (content.kind) {
    case "basic":
      componentContent = (
        <>
          <div><b>{content.name} {content.exerciseCount}</b></div>
          <div><i>{content.description}</i></div>
          <br/>
        </>
      )
      break
    case "group":
      componentContent = (
        <>
          <div><b>{content.name} {content.exerciseCount}</b></div>
          <div>Project exercises {content.groupProjectCount}</div>
          <br/>
        </>
      )
      break
    case "background":
      componentContent = (
        <>
          <div><b>{content.name} {content.exerciseCount}</b></div>
          <div>{content.description}</div>
          <div>submit to {content.backgroundMaterial}</div>
          <br/>
        </>
      )
      break
    case "special":
      componentContent = (
        <>
          <div><b>{content.name} {content.exerciseCount}</b></div>
          <div>{content.description}</div>
          <div>requirements: {content.requirements.join(', ')}</div>
          <br/>
      </>
      )
  }
  return (
    <div>
      {componentContent}
    </div>
  )
}


const Content = (props: ContentTypes) => {
  return (
    <>
      {
        props.content.map((item) => {
          return (
            <Part key={item.name} content={item}/>
          )
        })
      }
    </>
  )
}



export default Content