import ProgressBar from "@ramonak/react-progress-bar"

const QueueItem = ({ fileName, size, progress }: {
    fileName: string,
    size: number,
    progress: number
}) => (
    <div className="flex flex-col border border-solid border-[#bdc1ca] rounded p-4 mb-4 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="font-manrope text-[#171a1f] text-md font-bold truncate sm:w-2/3 w-full">{fileName}</div>
            <div className="font-manrope text-[#171a1f] text-sm sm:w-1/3 w-full sm:text-right mt-2 sm:mt-0">{(size / (1024 * 1024 * 1024)).toFixed(3)} GB</div>
        </div>
        {progress !== undefined && (
            <div className="mt-2 w-full">
                <ProgressBar
                    completed={progress}
                    maxCompleted={100}
                    animateOnRender={true}
                    bgColor={progress > 20 ? progress > 60 ? 'lightgreen' : 'blue' : 'red'}
                    isLabelVisible={false}
                    height="5px"
                    className="w-full"
                />
                <div className="font-manrope text-[#171a1f] text-sm mt-2">Status: {progress}% completed</div>
            </div>
        )}
    </div>
)

export default QueueItem
