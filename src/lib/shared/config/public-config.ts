type PublicConfig = {
	appName: string;
	appwriteEndpoint: string;
	appwriteProjectId: string;
	appwriteDatabaseId: string;
};

export function parsePublicConfig(env: Record<string, string | undefined>): PublicConfig {
	function required(name: string): string {
		const value = env[name]?.trim();

		if (!value) throw new Error(`${name} is required`);

		return value;
	}

	const endpoint = required('PUBLIC_APPWRITE_ENDPOINT');

	if (!URL.canParse(endpoint)) {
		throw new Error('PUBLIC_APPWRITE_ENDPOINT must be a valid URL');
	}

	return {
		appName: required('PUBLIC_APP_NAME'),
		appwriteEndpoint: endpoint,
		appwriteProjectId: required('PUBLIC_APPWRITE_PROJECT_ID'),
		appwriteDatabaseId: required('PUBLIC_APPWRITE_DATABASE_ID')
	};
}
