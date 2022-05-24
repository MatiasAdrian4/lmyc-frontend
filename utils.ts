import { GetServerSidePropsContext } from "next"
import { NextApiRequestCookies } from "next/dist/server/api-utils"
import { LMYC_JWT } from "./constants"

export const get_jwt_from_ctx = (ctx: GetServerSidePropsContext) => {
    const cookies: NextApiRequestCookies = ctx.req.cookies
    return cookies[LMYC_JWT]
}