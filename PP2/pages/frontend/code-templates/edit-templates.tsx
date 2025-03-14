import React, { FormEvent, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';

const EditTemplate: React.FC = () => {
    const [error, setError] = React.useState("");
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();
    const { id } = router.query; 

    const [template, setTemplate] = useState({
        title: '',
        explanation: '',
        code: '', 
        tags: '',     
    });
                
    const fetchTemplate = async () => {
        setLoading(true);
        setError('');

        const userId = localStorage.getItem('userId'); 
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Must be logged in or sign up to edit a code template.');
            return;
        }

        try {
            const response = await fetch(`/api/code-templates/search-saved?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized. Please log in.');
                }
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch code template.');
            }

            const data = await response.json();

            const currentTemplate = data.savedTemplates.find((t: any) => t.id === Number(id));
            if (!currentTemplate) {
                setError('Code Template not found.');
                return;
            }

            setTemplate({
                title: currentTemplate.title || '',
                explanation: currentTemplate.explanation || '',
                code: currentTemplate.code || '',
                tags: currentTemplate.tags.map((tag: any) => tag.name).join(', ') || '',
            });

        } catch (error : any) {
            setError(error.message || 'An error occurred while fetching the template.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
              setError('Unauthorized. Please log in.');
              return;
            }
      
            const updatedTags = template.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag);
      
            const response = await fetch(`/api/code-templates/edit-template?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: template.title,
                    explanation: template.explanation,
                    code: template.code,
                    tags: updatedTags,
                }),
            });
      
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized. Please log in.');
                }
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update the code template.');
            }
      
            setMessage('Code Template updated successfully!');
            router.push('/frontend/code-templates/view-templates'); // Redirect back to view templates
          
        } catch (err: any) {
            setError(err.message || 'An error occurred while updating the template.');
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTemplate((prevTemp) => ({
            ...prevTemp,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id) {
          fetchTemplate();
        }
    }, [id]);
    

    return (
        <>
            <Head>
                <title>Scriptorium</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-800 py-8">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg dark:bg-zinc-900">
                        <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">Edit Code Template</h1>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={template.title}
                                onChange={handleInputChange}
                                required
                                className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:text-white dark:bg-zinc-700"
                            />
                            <textarea
                                name="explanation"
                                placeholder="Explanation"
                                value={template.explanation}
                                onChange={handleInputChange}
                                required
                                className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:text-white dark:bg-zinc-700"
                                rows={4}
                            />
                            <textarea
                                name="code"
                                placeholder="Code"
                                value={template.code}
                                onChange={handleInputChange}
                                required
                                className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-900 dark:text-white dark:bg-zinc-700"
                                rows={6}
                            />
                            <input
                                type="text"
                                name="tags"
                                placeholder="Tags (comma-separated)"
                                value={template.tags}
                                onChange={handleInputChange}
                                className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:text-white dark:bg-zinc-700"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-blue-500 text-white font-bold py-3 rounded-lg ${
                                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                                }`}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form> 
                    </div>
                </div>
            </main>
        </>
    );

}

export default EditTemplate;
