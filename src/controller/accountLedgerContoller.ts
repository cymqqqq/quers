import { boe, ppe } from "../utils/config";
import { 
    accountBalance, 
    accountBalance_ShikuTestToken, 
    icp_query_newest_block_index, 
    query_block, 
    stt_get_transaction, 
    stt_get_transactions, 
    stt_query_newest_block, 
    stt_withdraw, 
    withdraw_icp 
} from "./accountController";

// balance context
export class LedgerController {
    public canister: any;
    public principal: any;
    public controller: any;
    public amount: any;
    public start_index: any;
    public block_length: any;

    public set_start_index(index: any) {
        this.start_index = index;
    }

    public set_block_length(block_length: any) {
        this.block_length = block_length;
    }

    public set_canister(canister: any) {
        this.canister = canister;
    }

    public set_principal(pid: any) {
        this.principal = pid;
    }

    public set_amount(amount: any) {
        this.amount = amount;
    }

    async build_account_balance_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await accountBalance(this.principal, this.canister);
            case boe.shikuTestToken:
                return await accountBalance_ShikuTestToken(this.canister, this.principal);
        } 
   }

   async build_transfer_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await withdraw_icp(this.canister, this.principal, this.amount);
            case boe.shikuTestToken:
                return await stt_withdraw(this.canister, this.principal, this.amount);
        }
   }

   async build_query_block_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await query_block(this.start_index)
            case boe.shikuTestToken:
                return await stt_get_transaction(this.canister, this.start_index)
        }
   }

   async build_scan_block_controller() {
        switch(this.canister) {
            case boe.shikuTestToken:
                return await stt_get_transactions(this.canister, this.start_index, this.block_length);
        }
   }

   async build_query_newest_block_controller() {
        switch(this.canister) {
            case ppe.ledger:
                return await icp_query_newest_block_index()
            case boe.shikuTestToken:
                return await stt_query_newest_block(this.canister)
        }
   }
}