import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import OnSession from '@/app/components/onSession/page'
import Check from './check'

export default async function Agreement() {
    let session = await getServerSession(authOptions)
    if(!session){
        return(
            <Check/>
        )
    } else {
        return(
            <OnSession/>
        )
    }
    
}