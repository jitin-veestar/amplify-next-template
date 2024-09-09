
import { type Schema } from '@/amplify/data/resource';
import { generateClient } from "aws-amplify/api";
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';


function useClient(){
    const [client, setClient] = useState<any>();
    useEffect(()=> {
       async function initializeUser(){
      const { userId } = await getCurrentUser();
      if (userId) {
        const session = await fetchAuthSession({ forceRefresh: true });

        const clients = generateClient<Schema>({
          authToken: session?.tokens?.idToken?.toString()
        });
        setClient(clients);
    }
    }
    initializeUser();
    }, [])

    return { client  };
}

export default useClient;