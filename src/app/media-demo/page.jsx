"use client";

import CloudinaryUploader from "../../components/CloudinaryUploader";
import { useState } from "react";
import { CldImage } from "next-cloudinary";

export default function MediaDemoPage() {
	const [uploaded, setUploaded] = useState(null);

	return (
		<div className="min-h-screen bg-[#070b12] text-white p-6">
			<h1 className="text-2xl font-semibold mb-4">Cloudinary Media Demo</h1>
			<CloudinaryUploader onUploadComplete={setUploaded} />
			{uploaded?.publicId ? (
				<div className="mt-6">
					<h2 className="text-lg mb-2">Uploaded:</h2>
					<p className="text-white/70 break-all">{uploaded.secureUrl}</p>
					<div className="mt-3">
						<CldImage src={uploaded.publicId} width="400" height="400" alt="Uploaded preview" />
					</div>
				</div>
			) : null}
		</div>
	);
}
