import { forwardRef } from "react"

const BugReport = forwardRef(function BugReport(props, ref) {
	const { close } = props;
	return (
		<dialog ref={ref}
			className="rounded-2xl relative px-12 pt-1 pb-10">

			<button className="btn btn-circle btn-sm absolute top-2.5 left-2" onClick={close} title="Close">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>

			<h2 className="mt-0.5 mb-4 text-4xl bold">Report a Bug</h2>

			{/* Netlify Form */}
			<form name="contact" netlify netlify-honeypot="bot-field"
				className="flex-grow flex flex-col gap-6">
				{/* Netlify form stuff */}
				<input type="hidden" name="form-name" value="contact" />

				<label><span className="text-xl">Bug Description:</span>
					<textarea name="message" rows="6" cols="54" required
						className="mt-1 block textarea textarea-accent resize-none"></textarea>
				</label>
				<button type="submit"
					className="btn">Send</button>
			</form>
		</dialog>
	)
});

export default BugReport;