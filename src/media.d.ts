declare module '*.jpg' {
  const value: any
  export = value
}
declare module '*.jpeg' {
  const value: any
  export = value
}
declare module '*.png' {
  const value: any
  export = value
}
declare module '*.mp4' {
  const src: string
  export default src
}
declare module '*webm' {
  const src: string
  export default src
}

// https://github.com/gregberge/svgr/issues/38#issuecomment-717602727
declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
