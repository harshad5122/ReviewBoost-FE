import { CheckCircle2 } from "lucide-react";

export default function ReviewSuccess() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
      <CheckCircle2 className="w-16 h-16 mx-auto text-green-600" />

      <h2 className="text-3xl font-bold mt-6">Review Ready!</h2>

      <p className="text-gray-600 mt-4">
        Your AI-generated review is ready to post on Google.
      </p>
    </div>
  );
}
