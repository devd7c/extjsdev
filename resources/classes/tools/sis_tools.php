<?php

/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
 session_start();
require_once '../../ConnectionBD.php';
require_once 'sis_tools_server.php';

require_once 'CodigoControl.php';

    class sis_tools
    {
        public $_iduser;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;

        }
      
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=isset($datos['yaction'])?$datos['yaction']:'';
            switch ($option)
            {   
                case 'export':
                    switch ($yaction) {
                        case 'librocompras':
                            $empresa=  erp_enterprise::find($this->_identerprise);
                            $pathd='../../dataexport/';
                            $periodo=  explode('-', $datos['fechaini']);
                            $archivo=$pathd.'compras_'.$periodo[1].$periodo[2].'_'.$empresa->enterprisenit.'.doc';
                            
                            $sql="SELECT edoc.*,ep.*,to_char(edoc.documentdate,'dd/MM/yyyy') as newdate,edoc.totalbilling::numeric(15,2) as totalcompra,
                                  edoc.totalice::numeric(15,2) as icetotal,edoc.totalexemptamount::numeric(15,2) as excento,edoc.netamount::numeric(15,2) as neto,
                                  edoc.totalivataxcredit::numeric(15,2) as iva
                                  FROM erpd_txn_cash_document edoc 
                                  INNER JOIN erp_provider ep ON ep.idprovider=edoc.idprovider AND ep.idregimen=340
                                  WHERE edoc.identerprise=".$this->_identerprise." AND edoc.state=44  AND edoc.documentdate>='". sis_tools_server::dateFormat($datos['fechaini'],'-')."' AND edoc.documentdate<='". sis_tools_server::dateFormat($datos['fechafin'],'-')."'";
                            $datoscompras=  erpd_txn_cash_document::find_by_sql($sql);
                            $txtcompras='';
                            foreach ($datoscompras as $compras) {
                                    $txtcompras.="1|".$compras->nit."|".$compras->providername."|".$compras->invoicenumber."|0|".
                                                    $compras->autorizationnumber."|".$compras->newdate."|".$compras->totalcompra."|".
                                                    $compras->icetotal."|".$compras->excento."|".$compras->neto."|".
                                                    $compras->iva."|".$compras->controlcode."\r\n";
                                };
                            if($fp = fopen($archivo,"w+")){
                                fwrite($fp,$txtcompras);
                                //rename($archivo, $archivo.'.doc');
                                fclose($fp);
                                echo '{"success":true,"archivo":"'.'compras_'.$periodo[1].$periodo[2]."_".$empresa->enterprisenit.'.doc'.'"}';
                            }else{
                                fclose($fp);
                                echo '{"success":false,"title":"Error:","msg":"No se pudo generar el archivo!!!"}';
                            }
                            //print_r($datoscompras);

                        break;
                        case 'libroventas':
                            $empresa=  erp_enterprise::find($this->_identerprise);
                            $pathd='../../dataexport/';
                            $periodo=  explode('-', $datos['fechaini']);
                            $archivo=$pathd.'ventas_'.$periodo[1].$periodo[2].'_'.$empresa->enterprisenit.'.doc';
                            
                            $sql="SELECT txn.*,COALESCE(txn.controlcode,'0') AS controlcode2,totales.totalventa,totales.totalice,0 as excento,totales.neto,
                                                (totales.neto*0.13)::numeric(15,2) as iva,
                                                CASE WHEN txn.state=44 THEN 'V' ELSE 'A' END as estado,
                                                to_char(txn.date,'dd/MM/yyyy') as newdate,ee.*
                                  FROM erpd_txn_store txn
                                  INNER JOIN (SELECT dtxn1.idtxnstore,sum(dtxn1.quantity*dtxn1.price-COALESCE(dtxn1.totaldiscount,0))::numeric(15,2) as totalventa,
                                                    sum(icetotal)::numeric(15,2) as totalice, 
                                                     sum(dtxn1.quantity*dtxn1.price-COALESCE(dtxn1.totaldiscount,0)-COALESCE(icetotal,0))::numeric(15,2) as neto
						FROM erpdd_txn_store dtxn1
						INNER JOIN erpd_txn_store txn1 ON txn1.idtxnstore=dtxn1.idtxnstore AND txn1.concept IN (230,388) AND txn1.state<>43 
						GROUP BY dtxn1.idtxnstore) as totales ON totales.idtxnstore=txn.idtxnstore
                                  INNER JOIN erp_electronic_billing ee ON ee.idelectronicbilling=txn.idelectronicbilling 
                                  WHERE txn.identerprise=".$this->_identerprise." AND txn.billingtype in (233,234) AND txn.concept IN (230,388) AND ".'txn."state"<>43'." AND txn.date>='".sis_tools_server::dateFormat($datos['fechaini'],'-')."' AND txn.date<='". sis_tools_server::dateFormat($datos['fechafin'],'-')."'
                                  ORDER BY txn.invoicenumber ASC";
                            $datosventas=  erpd_txn_store::find_by_sql($sql);
                            $txtventas='';
                            foreach ($datosventas as $ventas) {
                                if ($ventas->state==45) {
                                    $txtventas.=    "0|ANULADO|".$ventas->invoicenumber."|".
                                                    $ventas->autorizationnumber."|".$ventas->newdate."|0|0|0|0|0|".$ventas->estado."|0\r\n";
                                }else{
                                    $txtventas.=    $ventas->othernit."|".$ventas->otherbusinessname."|".$ventas->invoicenumber."|".
                                                    $ventas->autorizationnumber."|".$ventas->newdate."|".$ventas->totalventa."|".
                                                    $ventas->totalice."|".$ventas->excento."|".$ventas->neto."|".
                                                    $ventas->iva."|".$ventas->estado."|".$ventas->controlcode2."\r\n";
                                }
                                    
                                };
                            if($fp = fopen($archivo,"w+")){
                                fwrite($fp,$txtventas);
                                echo '{"success":true,"archivo":"'.'ventas_'.$periodo[1].$periodo[2]."_".$empresa->enterprisenit.'.doc'.'"}';
                            }else{
                                fclose($fp);
                                echo '{"success":false,"title":"Error:","msg":"No se pudo generar el archivo!!!"}';
                            }
                            //print_r($datoscompras);
                        break;
                        default:
                        break;
                    }
                break;
                case 'resetcantidaditemempleado':
                    
                break;
                case 'validarcodigocontrol':
                        $fecha=explode('/', $datos['datesale']);
                        $fecha=$fecha[2].$fecha[1].$fecha[0];
                        $monto=round($datos['monto'],0);

                        $codcon=new CodigoControl($datos['autorizationnumber'],$datos['factura'],$datos['nit_ci'],$fecha,$monto,$datos['keydosage']);
                        echo '{"success":true,"title":"Correcto:","codigocontrol":"Codigo de Control:'.$codcon->generar().'"}';
                break;
                case 'existfile':
                    if (file_exists($datos['dir'])){
                        echo '{"success":true}';
                    }else{
                        echo '{"success":false,"title":"Error:","msg":"No existe un documento asignado!!!"}';
                    } 
                break;
                case 'getServerDate':
                    $sql="SELECT CURRENT_DATE as fecha";
                    
                    try {
                        $result=  erp_type::find_by_sql($sql);
                        $res=$result[0]->fecha;
                        echo '{"success":true,"serverdate":"'.$res.'"}';
                    } catch (Exception $exc) {
                        echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    }

                    
                break;
                case 'getServerTime':
                    $sql="SELECT CURRENT_TIME as servertime";
                    
                    try {
                        $result=  erp_type::find_by_sql($sql);
                        $res=$result[0]->servertime;
                        echo '{"success":true,"servertime":"'.$res.'"}';
                    } catch (Exception $exc) {
                        echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    }

                    
                break;
            
                case 'gerSessionUser':
                        echo '{"success":true,"iduser":"'.$this->_iduser.'"}';
                break;
                case 'getSessionUser':
                        echo '{"success":true,"iduser":"'.$this->_iduser.'"}';
                break;
                case 'getSessionEmployee':
                    $user=  erp_user::find_by_iduser_and_identerprise($this->_iduser,  $this->_identerprise);
                        echo '{"success":true,"idemployee":'.$user->idemployee.'}';
                break;
                
                case 'getDataUser':
                        $query="SELECT cli.idemployee,COALESCE(c.idbranch,0)  as idbranch,COALESCE(cemp.idcash,0) as idcash,
                                        COALESCE(s.idstore,0) AS idstore
                                FROM erp_employee cli  
                                INNER JOIN erp_user usr ON usr.idemployee=cli.idemployee AND usr.iduser=".$this->_iduser."  
                                LEFT OUTER JOIN erp_cash_employee cemp ON cemp.idemployee=cli.idemployee
                                LEFT OUTER JOIN erp_cash c ON c.idcash=cemp.idcash 
                                LEFT OUTER JOIN erp_store s ON s.idbranch=c.idbranch";
                        $datauser=erp_type::find_by_sql($query);
                        if (count($datauser)) {
                            echo '{"success":true,"iduser":"'.$this->_iduser.'","identerprise":'.$this->_identerprise.
                             ',"idemployee":'.$datauser[0]->idemployee.',"idbranch":'.$datauser[0]->idbranch.
                             ',"idcash":'.$datauser[0]->idcash.
                             ',"idstore":'.$datauser[0]->idstore.'}';
                        }else{
                            echo '{"success":true,"iduser":"0","identerprise":'.$this->_identerprise.'
                             ,"idemployee":0,"idbranch":0
                             ,"idcash":0,"idstore":0}';
                        }
                        
                break;

                 case 'readprimarycurrency':
                    
                 try {
                     $currency=erp_type::first(array('select'=>'*','from'=>'erp_type','conditions'=>array('value=? AND option=? AND identerprise=?',11,'tipo_moneda',  $this->_identerprise)));
                     
					 echo '{"success":true,"currencyid":'.$currency->idtype.',"currencysimbol":"'.$currency->alias.'"}';
                 }  catch (Exception $exc){ 
                    print_r($exc);
					// echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    
                 }
                break;
				case 'readbaseitemlistprice':
                    
                 try {
                     $itemlistprice=erp_item_list_price::first(array('select'=>'*','from'=>'erp_item_list_price','conditions'=>array('baselist=? AND identerprise=?','true',$this->_identerprise)));
                     
					 echo '{"success":true,"iditemlistprice":'.$itemlistprice->iditemlistprice.'}';
                 }  catch (Exception $exc){ 
                    print_r($exc);
					 echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    
                 }
                break;
                case 'readinitdatasales':
                    
                 try {
                    $sql="
                        SELECT c.idcash,c.cashname,c.idbranch,ee.code as employeecode,e.enterprisenit,u.idemployee
                        from erp_user u
                        --INNER JOIN erp_client ec ON ec.idclient=u.idemployee
                        INNER JOIN erp_employee AS ee ON ee.idemployee = u.idemployee
                        INNER JOIN erp_cash_employee ce on ce.idemployee=ee.idemployee
                        INNER JOIN erp_cash c on c.idcash=ce.idcash
                        INNER JOIN erp_branch b on b.idbranch=c.idbranch
                        -- INNER JOIN erp_branch_employee be on be.idbranch=c.idbranch
                        INNER JOIN erp_enterprise e on e.identerprise=b.identerprise
                        where u.iduser=$this->_iduser AND b.identerprise=$this->_identerprise AND ce.active=true AND c.active=true
                        GROUP BY c.idcash,c.cashname,b.idbranch,ee.code,e.enterprisenit,u.idemployee
                    ";
                     //echo $sql;
                     $initdatasales=  erp_user::find_by_sql($sql);
                     
                     if($initdatasales){
                        $store=  erp_store::find_by_sql("
                                SELECT e.*,
                                COALESCE((SELECT l.iditemlistprice FROM erp_item_list_price l WHERE l.idbranch=e.idbranch AND l.baselist=true AND l.active=TRUE),0) as iditemlistprice
                                FROM erp_store e 
                                WHERE e.forsale=TRUE and e.idbranch=".$initdatasales[0]->idbranch." AND e.active=true AND e.identerprise=".$this->_identerprise."
                            ");
                       $habilitarfecha= erp_configuration::find_by_type_and_module_and_identerprise('habilitar_fecha','ventas',  $this->_identerprise);
                       $habilitarlistprice=erp_configuration::find_by_type_and_module_and_identerprise('habilitar_listaprecios','ventas',  $this->_identerprise);
                       $fecha=($habilitarfecha->default!=''?1:0);
                       $listprice=($habilitarlistprice->default!=''?1:0);
                       $tipo_facturacion=  erp_configuration::find_by_type_and_module_and_default_and_identerprise('tipo_facturacion','ventas',true,  $this->_identerprise);
                       
                        echo '{"success":true,"idcash":'.$initdatasales[0]->idcash.',"cashname":"'.$initdatasales[0]->cashname.'","employeecode":"'.$initdatasales[0]->employeecode.'","enterprisenit":'.$initdatasales[0]->enterprisenit.',"iditemlistprice":'.$store[0]->iditemlistprice.',"idstore":'.$store[0]->idstore.',"idbranch":'.$initdatasales[0]->idbranch.',"fecha":'.$fecha.',"listprice":'.$listprice.',"billingtypevalue":"'.$tipo_facturacion->custom.'","responsible":'.$initdatasales[0]->idemployee.'}';
                     }else{
                         echo '{"success":false,"msg":"El usuario no tiene asignado una caja o no esta asignado a esta sucursal"}';
                         
                     }
                                         
                                         
                                         
                 }  catch (Exception $exc){ 
                    print_r($exc);
					 echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    
                 }
                 
                
                break;
                case 'readdailyrate':
                    
                 try {
                    $sql="
                       SELECT * 
                        FROM erp_exchange_rate AS er    
                        INNER JOIN erp_type t ON t.idtype=er.currency
                        WHERE t.value='12' AND t.identerprise=$this->_identerprise AND er.dateexchange IN (SELECT CURRENT_DATE)
                    ";
                     $exchangerate=erp_exchange_rate::find_by_sql($sql);
                    ($exchangerate?$dailyrate=true:$dailyrate=false);
                    $result=array("success"=>true,"dailyrate"=>$dailyrate);
                    echo json_encode($result);
                                         
                                         
                                         
                 }  catch (Exception $exc){ 
                    //print_r($exc);
                    echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    
                 }
                 
                
                break;
                case 'verifyinitialparametersforsale':
                    
                 try {
                   
                    
                    $serverdate=sis_tools_server::getServerDate();
                    $cashemployee=sis_tools_server::verifyCashEmployee($this->_identerprise,  $this->_iduser);
                   
                    $res=array("success"=>true,
                            "dailyrate"=> sis_tools_server::verifyDailyRate($this->_identerprise),
                            "cash"=> $cashemployee,
                            "storeforsale"=>  sis_tools_server::verifyStoreForSale($this->_identerprise,  $this->_iduser),
                            "closingcash"=> sis_tools_server::verifyClosingCash($serverdate,$this->_identerprise,$this->_iduser),
                            "baselistprice"=> sis_tools_server::verifyBaseListPrice($this->_identerprise,$this->_iduser)
                      );
                    $billing= sis_tools_server::verifyAllBillingType($this->_identerprise,  $this->_iduser);
                    
                    $result=array_merge($res, $billing);
                    
                    echo json_encode($result); 
                     if($cashemployee){
                       sis_tools_server::notificacionesDosificacion($billing,$this->_identerprise,  $this->_iduser); 
                    }                    
                                        
                                         
                 }  catch (Exception $exc){ 
                    //print_r($exc);
                    echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    
                 }
                 
                
                break;
                case 'serverlink':
                   
                    $res=false;
                    if(sis_tools_server::serverlink()==1){
                         echo '{"success":true,"resultado":true}';
                    }else{
                          echo '{"success":false,"resultado":false}';
                    }
                   
                break;
                case 'checkcreditclientonserver':
                   
                    $res=false;
                    if(sis_tools_server::serverlink()==1){
                        $avaliablecredit=0;
                        $remoteclient= erp_client::find($datos['idclient']);
                        if($remoteclient)
                        $avaliablecredit=$remoteclient->limitcredit-$remoteclient->amountdue;
                        
                        echo '{"success":true,"link":true,"avaliablecredit":'.$avaliablecredit.'}';
                    }else{
                          echo '{"success":false,"link":false}';
                    }
                   
                break;

            }
        }
    }
      $xaction=$_POST['xaction'];
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $tools=new sis_tools($iduser,$identerprise);
    $tools->$xaction($_POST);
?>
