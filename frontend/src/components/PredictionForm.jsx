import { useState } from 'react'
import ResultDisplay from './ResultDisplay'

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
        income_lpa: '',
        smoker: 'False',
        city: '',
        occupation: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [prediction, setPrediction] = useState(null)


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? e.target.checked : value
        });
      };


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/predict' , {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
            body : JSON.stringify({
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height),
                income_lpa: parseFloat(formData.income_lpa),
                smoker: formData.smoker === 'True' || formData.smoker === true,
                city: formData.city,
                occupation: formData.occupation
            })
        });
        if(!response.ok){
            throw new Error('Prediction Failed');
        }

        const data = await response.json();
        setPrediction(data);
        setError(null);
        }
        catch(err){
            setError('Failed to get prediction. MAKE SURE BACKEND IS RUNNING');
            setPrediction(null);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4'>
            <div className = 'max-w-2xl mx-auto'>
                <div className = 'bg-white rounded-lg shadow-xl p-8'>
                    <h1 className = 'text-2xl font-bold text-center text-gray-800 mb-6'>
                        Insurance Premium Prediction
                    </h1>
                    <p className = 'text-center text-gray-600 mb-8'>
                        Enter your details to predict your insurance premium category
                    </p>

                    <div className = 'space-y-6'>
                        {/* Age Input */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Age
                            </label>
                            <input 
                                type = 'number'
                                name = "age"
                                value={formData.age}
                                onChange={handleChange}
                                min = "18"
                                max = "100"
                                className = 'w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder = 'Enter your age (18-100)'
                                required
                            />
                        </div>


                        <div>
                            <label className = 'block text-sm font-medium text-gray-700 mb-2'>
                                Smoker
                            </label>
                            <select 
                                name = 'smoker'
                                value = {formData.smoker}
                                onChange = {handleChange}
                                className = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            >
                                <option value = 'True'>True</option>
                                <option value = 'False'>False</option>
                            </select>
                        </div>

                        <div>
                            <label className = 'block text-sm font-medium text-gray-700 mb-2'>
                                Weight(kg)
                            </label>
                            <input
                                type ='number'
                                name = 'weight'
                                value = {formData.weight}
                                onChange = {handleChange}
                                min = '25'
                                max = '150'
                                className = 'w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder = 'Enter your weight (40-150)'
                                required
                            />
                        </div>

                        <div>
                            <label className = 'block text-sm font-medium text-gray-700 mb-2'>
                                Height(m)
                            </label>
                            <input 
                                type = 'number'
                                name = 'height'
                                value = {formData.height}
                                onChange = {handleChange}
                                min = '1.2'
                                max = '2.5'
                                className = 'w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder = 'Enter your height (1.2-2.5)'
                                required
                            />
                        </div>


                        <div> 
                            <label className = 'block text-sm font-medium text-gray-700 mb-2'>
                                Annual Income(LPA)
                            </label>
                            <input
                                type = 'number'
                                name = 'income_lpa'
                                value = {formData.income_lpa}
                                onChange = {handleChange}
                                min = '0'
                                max = '100'
                                className = 'w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder = 'Enter your annual income (0-100)'
                                required
                            />
                        </div>

                        <div>
                            <label className = 'block text-sm font-medium text-gray-700 mb-2'>
                                City
                            </label>
                            <input
                                type = 'text'
                                name = 'city'
                                value = {formData.city}
                                onChange = {handleChange}
                                className = 'w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                placeholder = 'Enter your city'
                                required
                            />
                        </div>


                        <div>
                            <label className = 'block text-sm font-medium text-gray-700 mb-2'>
                                Occupation
                            </label>
                            <select
                                name = 'occupation'
                                value = {formData.occupation}
                                onChange = {handleChange}
                                className = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                required
                            >
                                <option value = ''>Select your occupation</option>
                                <option value = 'retired'>Retired</option>
                                <option value = 'freelancer'>Freelancer</option>
                                <option value = 'student'>Student</option>
                                <option value = 'government_job'>Government Job</option>
                                <option value = 'business_owner'>Business Owner</option>
                                <option value = 'unemployed'>Unemployed</option>
                                <option value = 'private_job'>Private Job</option>
                            </select>
                        </div>

                        <button 
                            onClick={handleSubmit}
                            disabled = {loading}
                            className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Calculating...' : 'Get Premium Estimate'}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {prediction && (
                        <div className="mt-6">
                            <ResultDisplay prediction={prediction} />
                        </div>
                    )}
                        
                </div>
            </div>
        </div>
    )
}
