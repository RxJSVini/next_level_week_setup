interface ProgressBarProps{
    progress:number;
}

export default function ProgressBar(props:ProgressBarProps) {
    const progressStyles = {
        width:`${props.progress}%`
    }



  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados neste dia"
        className="h-3 rounded-xl bg-violet-600 w-3/4"
        aria-valuenow={props.progress}
        style={progressStyles}
      ></div>
    </div>
  );
}
