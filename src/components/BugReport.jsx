import { forwardRef } from "react"

const BugReport = forwardRef(function BugReport(props, ref) {
	const { close } = props;
	return (
		<dialog ref={ref}
			className="rounded-2xl relative p-10">
			<button className="btn btn-circle btn-outline btn-sm absolute top-1 left-1" onClick={close}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>
			<h2 className="text-3xl bold underline">Report a Bug</h2>
		</dialog>
	)
});

export default BugReport;