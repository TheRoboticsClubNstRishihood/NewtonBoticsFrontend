"use client";

import { useState, useCallback } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUD_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

export default function CloudinaryUploader({
	onUploadComplete,
	label = "Upload Media",
	folder = "newtonbotics/uploads",
	resourceType = "image",
	cropping = false,
	multiple = false,
	showPreview = true,
	previewWidth = 300,
	previewHeight = 300,
	maxFileSizeBytes, // optional limit; e.g., 5 * 1024 * 1024
	renderTrigger, // optional: custom trigger render function: ({ open }) => JSX
}) {
	const [lastResult, setLastResult] = useState(null);
	const [error, setError] = useState("");

	const handleSuccess = useCallback(
		(result) => {
			setError("");
			const info = result?.info || result;
			if (!info?.public_id) return;
			const payload = {
				publicId: info.public_id,
				secureUrl: info.secure_url || info.url,
				url: info.url || info.secure_url,
				width: info.width,
				height: info.height,
				format: info.format,
				resourceType: info.resource_type,
				bytes: info.bytes,
			};
			setLastResult(payload);
			onUploadComplete && onUploadComplete(payload);
		},
		[onUploadComplete]
	);

	const handleError = useCallback((err) => {
		const message = err?.statusText || err?.message || "Upload failed";
		setError(message);
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<CldUploadWidget
				options={{
					cloudName: CLOUD_NAME,
					apiKey: CLOUD_API_KEY,
					folder,
					resourceType,
					cropping,
					multiple,
					...(maxFileSizeBytes ? { maxFileSize: maxFileSizeBytes } : {}),
				}}
				uploadPreset={undefined}
				signatureEndpoint="/api/cloudinary/sign"
				apiKey={CLOUD_API_KEY}
				onUpload={handleSuccess}
				onSuccess={handleSuccess}
				onError={handleError}
			>
				{({ open }) => (
					renderTrigger ? (
						renderTrigger({ open })
					) : (
						<button
							type="button"
							onClick={() => open()}
							className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
						>
							{label}
						</button>
					)
				)}
			</CldUploadWidget>

			{error ? <span className="text-xs text-red-400">{error}</span> : null}

			{showPreview && lastResult?.publicId ? (
				<div className="mt-2">
					<CldImage
						src={lastResult.publicId}
						width={previewWidth}
						height={previewHeight}
						alt="Upload preview"
					/>
				</div>
			) : null}
		</div>
	);
}
