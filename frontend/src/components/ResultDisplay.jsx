export default function ResultDisplay({ prediction }) {
    const { predicted_category, confidence, class_probabilities } = prediction;

    const getCategoryColor = (category) => {
        const lower = category.toLowerCase();
        if (lower === 'high') return 'bg-red-100 border-red-400 text-red-800';
        if (lower === 'medium') return 'bg-yellow-100 border-yellow-400 text-yellow-800';
        return 'bg-green-100 border-green-400 text-green-800';
    };

    const getCategoryBgColor = (category) => {
        const lower = category.toLowerCase();
        if (lower === 'high') return 'bg-red-500';
        if (lower === 'medium') return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="mt-6 space-y-4">
            <div className={`p-6 rounded-lg border-2 ${getCategoryColor(predicted_category)}`}>
                <h2 className="text-xl font-bold mb-2">Predicted Premium Category</h2>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getCategoryBgColor(predicted_category)}`}></div>
                    <span className="text-2xl font-bold">{predicted_category}</span>
                </div>
                <p className="mt-2 text-sm opacity-80">
                    Confidence: {(confidence * 100).toFixed(1)}%
                </p>
            </div>

            {class_probabilities && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">Probability Distribution</h3>
                    <div className="space-y-2">
                        {Object.entries(class_probabilities)
                            .sort((a, b) => b[1] - a[1])
                            .map(([category, probability]) => (
                                <div key={category} className="space-y-1">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span className="capitalize">{category}</span>
                                        <span>{(probability * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${getCategoryBgColor(category)}`}
                                            style={{ width: `${probability * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

