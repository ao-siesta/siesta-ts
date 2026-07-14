import { oid } from '@/config.json'

const ErrorMessage = {
  AdminOnly: '此指令僅限管理員使用',
  ContactAdmin: `執行指令時出現問題，請洽伺服器管理員或<@${oid}>`,
  ExecuteError: '執行此指令時出現問題',
  OwnerAndServersOnly: '此指令僅限擁有者及部分伺服器使用',
  OwnerOnly: '此指令僅限擁有者使用',
} satisfies Record<string, string>

export default ErrorMessage
