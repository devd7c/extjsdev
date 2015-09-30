<?php
/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
    class sis_tools_server
    {
        public $_iduser;
        public $_identerprise;
 
        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;

        }
        public static function getActualDate($mode){
            
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_type::find_by_sql($sql);
            $res=$result[0]->fecha;
            $res= explode($res, '.');
            //$date=new ActiveRecord\DateTime();
            //echo $date->format('Y-m-d H:i:s');
            if ($mode=='N') {
                return $res[0];
            }else{
                return $result[0]->fecha;//2012-07-03 22:09:41.488-04:30
            }
            
        }
        
        public static function getActualServerTime(){
            $sql="SELECT CURRENT_TIME as servertime";
                    
            try {
                $result=  erp_type::find_by_sql($sql);
                $res=$result[0]->servertime;
               return $res;
            } catch (Exception $exc) {
                 return -1;
            }
        }
        public static function dateFormat($date,$char='/'){
            $chars=explode($char,$date);
            $newdate=$chars[2].$char.$chars[1].$char.$chars[0];
            return $newdate;
        }
        
        public static function  verificarDAILYRATE ($identerprise){
                    
            try {
            $sql="
                SELECT * 
                FROM erp_exchange_rate AS er    
                INNER JOIN erp_type t ON t.idtype=er.currency
                WHERE t.value='12' AND t.identerprise=$identerprise AND er.dateexchange IN (SELECT CURRENT_DATE)
            ";
             $exchangerate=erp_exchange_rate::find_by_sql($sql);
            ($exchangerate?$dailyrate=1:$dailyrate=0);



            }  catch (Exception $exc){ 
            $dailyrate=-1;
            }
            return $dailyrate;

               
        }
        public  static function verifyDailyRate($identerprise){
            $res=false;
            try{
                 $sql="
                       SELECT * 
                        FROM erp_exchange_rate AS er    
                        INNER JOIN erp_type t ON t.idtype=er.currency
                        WHERE t.value='12'AND t.identerprise=$identerprise AND er.dateexchange IN (SELECT CURRENT_DATE)
                    ";
                 $sql2=" SELECT er.currency,er.amount 
                        FROM erp_exchange_rate AS er    
                        INNER JOIN erp_type t ON t.idtype=er.currency
                        WHERE t.value='12'AND t.identerprise=$identerprise ORDER BY er.dateexchange DESC LIMIT 1";
                  
                  $conftipocambio=  erp_configuration::find_by_type_and_identerprise('tipo_cambio_diario',$identerprise);
                  
                  $exchangerate=erp_exchange_rate::find_by_sql($sql);
                  if ($conftipocambio->default==1) {
                    ($exchangerate?$res=true:$res=false);
                  }  else {
                      
                      
                      $exchangerate=erp_exchange_rate::find_by_sql($sql);
                      if (!$exchangerate) {
                          $currdate=  erp_exchange_rate::find_by_sql("SELECT CURRENT_DATE as fecha");
                          $lasttipocambio=erp_exchange_rate::find_by_sql($sql2);
                          $data['dateexchange']=$currdate[0]->fecha;
                          $data['currency']=$lasttipocambio[0]->currency;
                          $data['amount']=$lasttipocambio[0]->amount;
                          $newerate=new erp_exchange_rate($data);
                          $newerate->save();
                      }
                      $res=true;
                  }
                  
                 return $res;
            }  catch (Exception $exc){
                print_r($exc);
                return -1;
            }
            
            
        }
        public  static function verifyCashEmployee($identerprise,$iduser){
          
            $join='';
            try{
                  //$join="INNER JOIN erp_client cl on cl.idclient=u.idemployee";
                  $join="INNER JOIN erp_employee e on e.idemployee=u.idemployee";
                  $join.=" INNER JOIN erp_cash_employee ce ON ce.idemployee =u.idemployee";
                  $join.=" INNER JOIN erp_cash c ON ce.idcash = c.idcash";
                     
                  $usercash= erp_user::find('all',array('select'=>'c.*','from'=>'erp_user as u','joins'=>$join,'conditions'=>array('u.identerprise=? AND u.iduser=?',  $identerprise,  $iduser)));
                 
                  ($usercash?$res=true:$res=false);
                  return $res;
            }  catch (Exception $exc){
                print_r($exc);
                return -1;
            }
            
            
        }
        public  static function verifyAllBillingType($identerprise,$iduser){
            
            try{
                //Facturacion
                $idmanualbilling=0;
                $idelectronicbilling=0;
                $invoiceremaining=0;
                $manualdaysremaining=0;
                $electronicdaysremaining=0;
                $manualbilling=false;
                $electronicbilling=false;
                
                //Manual
                $sql="SELECT eb.idelectronicbilling,
                    eb.numberingfrom,
                    eb.numberingto,
                    (eb.numberingto-(SELECT (CASE WHEN MAX(invoicenumber)ISNULL THEN 0 ELSE MAX(invoicenumber) END) from erpd_txn_store WHERE billingtype=eb.typebilling) ) AS invoiceremaining,
                    eb.datelimit,
                    (eb.datelimit-(SELECT CURRENT_DATE)) as daysremaining,
                    eb.idbranch
                    FROM erp_user AS u
                    --INNER JOIN erp_client AS cl ON cl.idclient = u.idemployee
                    INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee
                    INNER JOIN erp_cash_employee AS ce ON ce.idemployee = e.idemployee
                    INNER JOIN erp_cash AS c ON c.idcash=ce.idcash
                    INNER JOIN erp_electronic_billing as eb ON eb.idbranch=c.idbranch


                    WHERE
                    u.identerprise = $identerprise AND
                    u.iduser = $iduser AND 
                    eb.active=TRUE AND
                    eb.typebilling in(SELECT idtype FROM erp_type WHERE alias='factura_manual') AND 
                    eb.datelimit >= (SELECT CURRENT_DATE) AND
                    eb.numberingto> ((SELECT (CASE WHEN MAX(invoicenumber)ISNULL THEN 0 ELSE MAX(invoicenumber) END) from erpd_txn_store WHERE billingtype=(SELECT idtype FROM erp_type WHERE alias='factura_manual')) )
                    ";
                //echo $sql;
                 $billing=  erp_electronic_billing::find_by_sql($sql);
                 if($billing){
                     $idmanualbilling=$billing[0]->idelectronicbilling;
                     $manualbilling=true;
                     $manualdaysremaining=$billing[0]->daysremaining;
                     $invoiceremaining=$billing[0]->invoiceremaining;
                     
                 }
                 
                 //electronica
                 $sql="SELECT eb.idelectronicbilling,
                        eb.datelimit,
                        (eb.datelimit-(SELECT CURRENT_DATE)) as daysremaining,
                        eb.idbranch
                        FROM erp_user AS u
                        --INNER JOIN erp_client AS cl ON cl.idclient = u.idemployee
                        INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee
                        INNER JOIN erp_cash_employee AS ce ON ce.idemployee = e.idemployee
                        INNER JOIN erp_cash AS c ON c.idcash=ce.idcash
                        INNER JOIN erp_electronic_billing as eb ON eb.idbranch=c.idbranch

                        WHERE
                        u.identerprise = $identerprise AND
                        u.iduser = $iduser AND 
                        eb.active=TRUE AND
                        eb.typebilling in(SELECT idtype FROM erp_type WHERE alias='factura_electronica') AND 
                        eb.datelimit >= (SELECT CURRENT_DATE) ";
                 
                 $billing=  erp_electronic_billing::find_by_sql($sql);
                 if($billing){
                     $idelectronicbilling=$billing[0]->idelectronicbilling;
                     $electronicbilling=true;
                     $electronicdaysremaining=$billing[0]->daysremaining;
                     $idbranch=$billing[0]->idbranch;
                    
                     
                 }
                 $result=array(
                        "idmanualbilling"=>$idmanualbilling,"manualbilling"=>$manualbilling,"manualdaysremaining"=>$manualdaysremaining,"invoiceremaining"=>$invoiceremaining,
                        "idelectronicbilling"=>$idelectronicbilling,"electronicbilling"=>$electronicbilling,"electronicdaysremaining"=>$electronicdaysremaining
                        );
               
                 return $result;
                     
                 
            }  catch (Exception $exc){ 
                print_r($exc);
                $result=array(
                            "manualbilling"=>-1,"manualdaysremaining"=>-1,"invoiceremaining"=>-1,
                            "electronicbilling"=>-1,"electronicdaysremaining"=>-1
                );
                return $result;
           }
          
        }

        public  static function verifyBillingType($identerprise,$iduser,$billingtype){
            $res=false;

            try{
                 switch ($billingtype) {
                   case 233:
                         //electronica
                         $sql="SELECT eb.idelectronicbilling,
                                eb.datelimit,
                                (eb.datelimit-(SELECT CURRENT_DATE)) as daysremaining
                                FROM erp_user AS u
                                --INNER JOIN erp_client AS cl ON cl.idclient = u.idemployee
                                INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee
                                INNER JOIN erp_cash_employee AS ce ON ce.idemployee = e.idemployee
                                INNER JOIN erp_cash AS c ON c.idcash=ce.idcash
                                INNER JOIN erp_electronic_billing as eb ON eb.idbranch=c.idbranch

                                WHERE
                                u.identerprise = $identerprise AND
                                u.iduser = $iduser AND 
                                eb.active=TRUE AND
                                eb.typebilling in(SELECT idtype FROM erp_type WHERE alias='factura_electronica') AND 
                                eb.datelimit >= (SELECT CURRENT_DATE) ";
                         
                         $billing=  erp_electronic_billing::find_by_sql($sql);
                         if($billing){
                             $res=true;
                             $electronicbilling=true;
                             $electronicdaysremaining=$billing[0]->daysremaining;
                         }

                        //print_r($billing);
                        return $res;
                    
                    break;

                    case 234:
                         //manual
                         $sql="SELECT eb.idelectronicbilling,
                            eb.numberingfrom,
                            eb.numberingto,
                            (eb.numberingto-(SELECT (CASE WHEN MAX(invoicenumber)ISNULL THEN 0 ELSE MAX(invoicenumber) END) from erpd_txn_store WHERE billingtype=eb.typebilling) ) AS invoiceremaining,
                            eb.datelimit,
                            (eb.datelimit-(SELECT CURRENT_DATE)) as daysremaining
                            FROM erp_user AS u
                            --INNER JOIN erp_client AS cl ON cl.idclient = u.idemployee
                            INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee
                            INNER JOIN erp_cash_employee AS ce ON ce.idemployee = e.idemployee
                            INNER JOIN erp_cash AS c ON c.idcash=ce.idcash
                            INNER JOIN erp_electronic_billing as eb ON eb.idbranch=c.idbranch


                            WHERE
                            u.identerprise = $identerprise AND
                            u.iduser = $iduser AND 
                            eb.active=TRUE AND
                            eb.typebilling in(SELECT idtype FROM erp_type WHERE alias='factura_manual') AND 
                            eb.datelimit >= (SELECT CURRENT_DATE) AND
                            eb.numberingto> ((SELECT (CASE WHEN MAX(invoicenumber)ISNULL THEN 0 ELSE MAX(invoicenumber) END) from erpd_txn_store WHERE billingtype=(SELECT idtype FROM erp_type WHERE alias='factura_manual')) )
                            ";
                         //echo $sql;
                         $billing=  erp_electronic_billing::find_by_sql($sql);
                         if($billing){
                             $res=true;
                             $manualbilling=true;
                             $manualdaysremaining=$billing[0]->daysremaining;
                             $invoiceremaining=$billing[0]->invoiceremaining;
                             
                         }
                        //print_r($billing);
                         return $res;

                    break;
                    case 331:
                         //Nota de Venta
                        
                         $res=true;
                        //print_r($billing);
                         return $res;

                    break;
                 }
            }  catch (Exception $exc){ 
                print_r($exc);
                
                return -1;
           }
          
        }
        public  static function verifyStoreForSale($identerprise,$iduser){
          
            $join='';
            try{
                  //$join="INNER JOIN erp_client cl on cl.idclient=u.idemployee";
                  $join="INNER JOIN erp_employee e on e.idemployee=u.idemployee";
                  $join.=" INNER JOIN erp_cash_employee ce ON ce.idemployee =u.idemployee";
                  $join.=" INNER JOIN erp_cash c ON ce.idcash = c.idcash";
                  $join.=" INNER JOIN erp_store s ON s.idbranch = c.idbranch";
                     
                  $storeforsale= erp_store::find('all',array('select'=>'s.*','from'=>'erp_user as u','joins'=>$join,'conditions'=>array('u.identerprise=? AND u.iduser=? AND s.forsale=? AND s.active=?',  $identerprise,  $iduser,true,true)));
                 
                  ($storeforsale?$res=true:$res=false);
                  return $res;
            }  catch (Exception $exc){
                print_r($exc);
                return -1;
            }
            
            
        }
        public  static function verifyBaseListPrice($identerprise,$iduser){
          
            $join='';
            try{
                  //$join="INNER JOIN erp_client cl on cl.idclient=u.idemployee";
                  $join=" INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee";
                  $join.=" INNER JOIN erp_cash_employee ce ON ce.idemployee =e.idemployee";
                  $join.=" INNER JOIN erp_cash c ON ce.idcash = c.idcash";
                  $join.=" INNER JOIN erp_item_list_price l ON l.idbranch = c.idbranch";
                     
                  $baselist= erp_item_list_price::find('all',array('select'=>'l.*','from'=>'erp_user as u','joins'=>$join,'conditions'=>array('u.identerprise=? AND u.iduser=? AND l.baselist=? AND l.active=?',  $identerprise,  $iduser,true,true)));
                 
                  ($baselist?$res=true:$res=false);
                  return $res;
            }  catch (Exception $exc){
                print_r($exc);
                return -1;
            }
            
            
        }
        public static function verifyClosingCash($date,$identerprise,$iduser){
            $res=0;
            try{
                $sql="
                select u.idemployee,ce.idcash,c.idbranch
                FROM erp_user u 
                --INNER JOIN erp_client cl    ON  cl.idclient=u.idemployee
                INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee
                INNER JOIN erp_cash_employee ce ON ce.idemployee=e.idemployee
                INNER JOIN erp_cash c ON c.idcash=ce.idcash
                WHERE u.iduser=$iduser AND u.active=true and u.identerprise=$identerprise
                ";

                $usercash= erp_user::find_by_sql($sql);
                if($usercash){
                $closecash=erp_close_cash::find_by_dateclose_and_idbranch_and_iduser_and_idcash($date,$usercash[0]->idbranch,$iduser,$usercash[0]->idcash);
                
                ($closecash?$res=true:$res=false);
                }
                return $res;
                
            }catch (Exception $exc){
                print_r($exc);
                return -1;
            }
        
        }
        public static function getServerDate(){
          
                    $sql="SELECT CURRENT_DATE as fecha";
                    
                    try {
                        $result=  erp_type::find_by_sql($sql);
                        $res=$result[0]->fecha;
                        return $res;
                    } catch (Exception $exc) {
                        return -1;
                       // echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    }
    
            
        }
        public static function calcularPrecioPOS($iditem,$idunit,$destinationstore,$iditemlistprice){
            $factorlist=0;
            $utilityfactor=0;
            $ice=0;
            $sql="SELECT count(*) as items from erp_item_list  WHERE iditem=".$iditem." AND iditemlistprice=".$iditemlistprice  ;
            //echo $sql;
            $countitemslist=  erp_item_list::find_by_sql($sql);

            if($countitemslist[0]->items>0){

                $itemlistprice=  erp_item_list_price::find($iditemlistprice);
                $factorlist=$itemlistprice->factorlist;
                $factorlist=$factorlist/100;

            }


            $item=erp_item::find($iditem);
            if($item->utilityfactor!=''){
                $utilityfactor=$item->utilityfactor;
                $utilityfactor=$utilityfactor/100;

            }
            if($item->icefactor!=''){
                $ice=$item->icefactor*$item->icelitros;


            }

            $sql="SELECT (ing.cost/ing.quantity) as cost FROM (SELECT ingSal.idunit,(ingSal.unitname||'-> '||sum(ingSal.quantity) ) as unitname1, sum(ingSal.quantity) as quantity, SUM(ingSal.cost2) as cost
                        FROM (
                        (SELECT i.idunit,u.unitname,sum(dd.quantity) as quantity, sum(dd.quantity*dd.cost) as cost2
                                        from erpd_txn_store d
                                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                        INNER JOIN erp_type t ON t.idtype=d.txntype
                                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                                        WHERE
                                        t.alias='ingreso_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.destinationstore=$destinationstore AND d.state=44 AND dd.idunit=$idunit
                                        GROUP BY i.idunit,u.unitname)
                        UNION
                        (SELECT i.idunit,u.unitname,sum(dd.quantity)*(-1) as quantity, sum(dd.quantity*dd.cost)*(-1) as cost2 
                                        from erpd_txn_store d
                                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                        INNER JOIN erp_type t ON t.idtype=d.txntype
                                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                                        WHERE
                                        t.alias='salida_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.originstore=$destinationstore AND d.state=44 AND dd.idunit=$idunit
                                        GROUP BY i.idunit,u.unitname)
                        ) as ingSal
                        GROUP BY ingSal.idunit, ingSal.unitname) ing";
            //echo $sql;
            $cost=erpdd_txn_store::find_by_sql($sql);
            $precio=($cost[0]->cost*(1-$factorlist+$utilityfactor))+$ice;
            return $precio;
        }
        public static function calcularPrecioVentaPOS($iditem,$idunit,$destinationstore,$iditemlistprice){
            $cost=0;
            $factorlist=0;
            $utilityfactor=0;
            $ice=0;
            try{
                $sql="SELECT count(*) as items from erp_item_list  WHERE iditem=".$iditem." AND iditemlistprice=".$iditemlistprice  ;
                $countitemslist=  erp_item_list::find_by_sql($sql);

                if($countitemslist[0]->items>0){

                    $itemlistprice=  erp_item_list_price::find($iditemlistprice);
                    $factorlist=$itemlistprice->factorlist;
                    $factorlist=$factorlist/100;

                }


                $item=erp_item::find($iditem);
                if($item->cost!=''){
                    $cost=$item->cost;


                }
                if($item->utilityfactor!=''){
                    $utilityfactor=$item->utilityfactor;
                    $utilityfactor=$utilityfactor/100;

                }
                if($item->icefactor!=''){
                    $ice=$item->icefactor*$item->icelitros;


                }
                $precio=($cost*(1-$factorlist+$utilityfactor))/*+$ice*/;
                return $precio;
                
            }catch(Exception $exc){
                print_r($exc);
            }
            
    }
	public static function calcularPrecioVentaPOSPIL($iditem,$idunit,$idstore,$iditemlistprice){
            $datosprecio= Array();
            $pricelist=0;
            $utilityfactor=0;
            $discount=0;
            //$store=  erp_store::find($destinationstore);
            //$branch=$store->idbranch;
            try{
                $sql="SELECT *  FROM erp_item_list  WHERE iditem=".$iditem." AND iditemlistprice=$iditemlistprice AND idunit in (SELECT iu.idunit FROM erp_item_unit iu where iu.iditem=$iditem  AND iu.basic=true)"  ;
                $itemlist=  erp_item_list::find_by_sql($sql);
               //echo $sql;

                if($itemlist && $itemlist[0]->pricelist>0){//modificado por max
                    $pricelist=$itemlist[0]->pricelist;
                    $discount=$itemlist[0]->discount;
                    //echo 'entro';
                }else{
                  
                    $listprice= erp_item_list_price::find_by_sql("select lp.* 
                            from erp_item_list_price lp
                            INNER JOIN erp_store s ON s.idbranch=lp.idbranch
                            WHERE s.forsale=true AND lp.baselist=true AND s.idstore=$idstore");
                     if($listprice){
                         unset($itemlist);
                         $sql="SELECT *  FROM erp_item_list  WHERE iditem=".$iditem." AND iditemlistprice=".$listprice[0]->iditemlistprice."  AND idunit in (SELECT iu.idunit FROM erp_item_unit iu where iu.iditem=$iditem  AND iu.basic=true)" ;
                         //echo $sql;
                         $itemlist=  erp_item_list::find_by_sql($sql);
                         if($itemlist){
                            $pricelist=$itemlist[0]->pricelist;
                            $discount=$itemlist[0]->discount;

                        }
                     }
                }
                
                $item=erp_item::find($iditem);
               
                if($item->utilityfactor!=''){
                    $utilityfactor=$item->utilityfactor;
                    $utilityfactor=$utilityfactor/100;

                }
               
	        if($discount==''){
		 $discount=0;
		}
                //$precio=($pricelist*(1+$utilityfactor));
                $precio=$pricelist;
                $datosprecio= Array(
                    "precio"=>$precio,
                    "descuento"=>$discount
                    
                    
                );
                //print_r($datosprecio);
               // return $precio;
                return $datosprecio;
                
            }catch(Exception $exc){
                print_r($exc);
            }
            
    }
    public static function notificacionesDosificacion($dosificaciones,$identerprise,$iduser){
        //echo $dosificaciones['electronicdaysremaining'];
        $res=true;
        $body=array();
        $sql="
            SELECT b.*
            FROM erp_user u
            --INNER JOIN erp_client cl ON cl.idclient=u.idemployee
            INNER JOIN erp_employee AS e ON e.idemployee = u.idemployee
            INNER JOIN erp_cash_employee ce ON ce.idemployee=e.idemployee
            INNER JOIN erp_cash c ON c.idcash=ce.idcash
            INNER JOIN erp_branch b ON b.idbranch=c.idbranch
            WHERE u.iduser=$iduser AND ce.active=true AND c.active=true AND b.identerprise=$identerprise AND b.branchactive=true";
      
         $branch= erp_branch::find_by_sql($sql);
        
         if($branch[0]->notifying){
             
            if($dosificaciones['manualbilling']==''){
                $body[]='No existe Docificacion Manual';
            }else{
                if($dosificaciones['manualdaysremaining']<=$branch[0]->daysinvoiceremaining){
                    $body[]='Quedan: '.$dosificaciones['manualdaysremaining'].' dias antes de la fecha limite para la docificacion manual de facturacion';

                }
                if($dosificaciones['invoiceremaining']<=$branch[0]->invoiceremaining){
                    $body[]='Quedan: '.$dosificaciones['invoiceremaining'].' facturas para la docificacion manual de facturacion';
                }
            }
            if($dosificaciones['electronicbilling']==''){
                $body[]='No existe Docificacion Electronica';
            }else{
                if($dosificaciones['electronicdaysremaining']<=$branch[0]->daysinvoiceremaining){
                    $body[]='Quedan: '.$dosificaciones['electronicdaysremaining'].' dias antes de la fecha limite para la docificacion electronica de facturacion';

                }
            }
         }
        if(count($body)>0){
           require_once '../../lib/mail/class.phpmailer.php';
           require_once '../../lib/mail/class.smtp.php';
           $configuracionmail=  erp_configuration::find_by_module_and_type('ventas','datos_mail');
           $configuracionsmtp=  erp_configuration::find_by_default_and_module_and_type(true,'ventas','datos_smtp');
           
            $mail             = new PHPMailer();
            //$body             = file_get_contents('contents.html');
            $mail->IsSMTP();
            $mail->SMTPAuth   = true;                  // enable SMTP authentication
                            // sets the prefix to the servier
            $mail->Host       = $configuracionsmtp->format;      // sets GMAIL as the SMTP server
            $mail->Port       = $configuracionsmtp->custom;                   // set the SMTP port
            if($configuracionmail->default==''){
                $mail->Username   = $configuracionmail->format; 
                $mail->Password   = $configuracionmail->custom;            // GMAIL password
                $mail->SMTPSecure = "ssl";
            }
            $mail->From       =  $configuracionmail->format;
            $mail->FromName   = "Webmaster -> POS-PIL";
            $mail->AltBody    = "This is the body when user views in plain text format"; //Text Body
            $mail->Subject    = "Notificaciones: Dosificacion de Factura Sistema POS Pil Andina - Sucursal:  ".$branch[0]->branchname;
            $mail->WordWrap   = 50; // set word wrap
            $bodylist="";
            for ($i=0; $i <  count($body) ; $i++) { 
                    $bodylist.=" <li style='width: 640px; font-family: Arial,Helvetica,sans-serif; font-size: 12px;'>".$body[$i]."</li> ";
            }
            $mail->MsgHTML("
                <html>
                <head>
                        <title></title>
                </head>
                <body style='margin: 10px;'>
                        <div style='width: 640px; font-family: Arial,Helvetica,sans-serif; font-size: 11px; text-align: center;'>
                                <span style='font-size:16px;'><span style='font-size:14px;'><strong>Dosificacion de Factura Sistema POS Pil Andina  - Sucursal:".$branch[0]->branchname."</strong></span></span></div>
                        <div style='width: 640px; font-family: Arial,Helvetica,sans-serif; font-size: 12px;'>
                                &nbsp;</div>
                        <div style='width: 640px; font-family: Arial,Helvetica,sans-serif; font-size: 12px;'>
                               Se produjeron La(s) siguiente(s) notificacion(es) :</div>
                        <ul>
                                ".$bodylist."
                        </ul>
                        <p>
			<span style='font-size:11px;'>Este mensaje se envio automaticamente a traves del sistema POS</span></p>
                 </body>
                </html>"
            );

            $mail->AddReplyTo( $configuracionmail->format,"Webmaster");

            //$mail->AddAttachment("/path/to/file.zip");             // attachment
            //$mail->AddAttachment("/path/to/image.jpg", "new.jpg"); // attachment

            $mail->AddAddress($branch[0]->recipientemail,"Supervisor Ventas");

            $mail->IsHTML(true); // send as HTML
            //print_r($mail);
            
            $mail->Send();
            /*
            if(!$mail->Send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
            } else {
            echo "Message has been sent";
            }
            */
            
        }
       
    
        
    }
    public static function getCashForEmployee($iduser,$identerprise){
          
            try{
                  $sql="SELECT c.idcash,c.idbranch
                        FROM erp_cash_employee ce
                        INNER JOIN erp_cash c ON c.idcash=ce.idcash
                        INNER JOIN erp_branch b ON b.idbranch=c.idbranch
                        WHERE ce.idemployee=$iduser AND ce.active=true AND c.active=true AND b.identerprise=$identerprise AND b.branchactive=true
                        GROUP BY c.idcash,c.idbranch";
                  
                     
                  $usercash= erp_cash_employee::find_by_sql($sql);
                
                  return $usercash;
             }  catch (Exception $exc){
                 print_r($exc);
             }
   
    }
    public static function serverlink(){
          $res=1;
          /*
          $output = shell_exec("ping -w 1000 $host");
          if (strpos($output, "could not find host")) {
              $res=0;
           }
           */

          $configuration_host_principal=  erp_configuration::find_by_type_and_module_and_default_and_identerprise('host_principal','ventas',true, 2);
          

          $fP = @fSockOpen($configuration_host_principal->custom, 5432, $errno, $errstr, 10); 

          if(!$fP) $res=0;
            
          return $res;
         
    }
    public static function getQuantityInStoreForBasicUnit($iditem,$idstore){
        $quantity=0;
        $sql="SELECT sum(ingSal.quantity) AS quantity
                        FROM ((SELECT i.idunit,u.unitname,sum(CASE WHEN t.alias='salida_almacen' and d.state=87 THEN dd.quantity WHEN t.alias='ingreso_almacen' AND d.state=44 THEN dd.quantity else 0 END) as quantity
                        from erpd_txn_store d
                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                        INNER JOIN erp_type t ON t.idtype=d.txntype
                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                        WHERE
                        (t.alias='ingreso_almacen' or t.alias='salida_almacen') and dd.iditem=$iditem and i.iditem=$iditem AND dd.destinationstore=$idstore AND (d.state=44 or d.state=87) AND i.basic=TRUE
                        GROUP BY i.idunit,u.unitname)
                        UNION
                        (SELECT i.idunit,u.unitname,sum(dd.quantity)*(-1) as quantity  
                        from erpd_txn_store d
                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                        INNER JOIN erp_type t ON t.idtype=d.txntype
                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                        WHERE
                        t.alias='salida_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.originstore=$idstore AND (d.state=44 or d.state=86  or d.state=87) AND i.basic=TRUE
                        GROUP BY i.idunit,u.unitname)) as ingSal
                        GROUP BY ingSal.idunit, ingSal.unitname";

        //echo $sql;
        $quatityunits=erp_unit::find_by_sql($sql);
        //$total=count($quatityunits);

        if($quatityunits){
                $quantity=$quatityunits[0]->quantity;

        }
        return $quantity;
                            
		
    }
    public static function getQuantityInStoreForUnit($iditem,$idunit,$idstore){
        $quantity=0;
        $sql="SELECT sum(ingSal.quantity) AS quantity
                        FROM ((SELECT i.idunit,u.unitname,sum(CASE WHEN t.alias='salida_almacen' and d.state=87 THEN dd.quantity WHEN t.alias='ingreso_almacen' AND d.state=44 THEN dd.quantity else 0 END) as quantity
                        from erpd_txn_store d
                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                        INNER JOIN erp_type t ON t.idtype=d.txntype
                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                        WHERE
                        (t.alias='ingreso_almacen' or t.alias='salida_almacen') and dd.iditem=$iditem and i.iditem=$iditem AND dd.idunit=$idunit AND dd.destinationstore=$idstore AND (d.state=44 or d.state=87) AND i.basic=TRUE
                        GROUP BY i.idunit,u.unitname)
                        UNION
                        (SELECT i.idunit,u.unitname,sum(dd.quantity)*(-1) as quantity  
                        from erpd_txn_store d
                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                        INNER JOIN erp_type t ON t.idtype=d.txntype
                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                        WHERE
                        t.alias='salida_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.originstore=$idstore AND dd.idunit=$idunit AND (d.state=44 or d.state=86  or d.state=87) AND i.basic=TRUE
                        GROUP BY i.idunit,u.unitname)) as ingSal
                        GROUP BY ingSal.idunit, ingSal.unitname";

        echo $sql;
        $quatityunits=erp_unit::find_by_sql($sql);
        //$total=count($quatityunits);

        if($quatityunits){
                $quantity=$quatityunits[0]->quantity;

        }
        return $quantity;
                            
		
    }
  }
?>
