<?php
/*
 * @Autor: Guido Terceros Fernandez
 * @Email: guido.terceros@gmail.com
 */
require_once '../include.php';
class sis_app_item 
{

	public function __construct() {
		
	}

	public function __call($option,$att) {
		$datos=$att[0];
		$yaction=$datos['yaction'];
		//echo $datos['xaction'];
		switch ($option)
		{
			case 'readitemstock':
				$filter='';
				$where='';
				$start=$datos['start'];
				$limit=$datos['limit'];
				if (isset($datos['filter']) && $datos['filter']!='') {
					$filter=  json_decode($datos['filter']);
					foreach ($filter as $datafil) {
						$where.=' WHERE '.$datafil->property." ilike '%".$datafil->value."%'";
					}

				}
				$proxy = 'http://dicobol.com/api/soap?wsdl';
				$soap = new SoapClient($proxy);
				$sessionId = $soap->login('catalogondemand', '*admin123*');
				$itemsc = $soap->call($sessionId, 'catalog_product.list');
				//echo($itemsc);
				/*$sql="SELECT (SELECT count(iditem) as
				total FROM zf_rpt_inventarios('2013-01-01','2015-01-01','2','0','0','27')".$where.") as total,
				ei.* FROM zf_rpt_inventarios('2013-01-01','2015-01-01','2','0','0','27') ei $where
				ORDER BY ei.iditem asc limit $limit offset $start";*/
				//echo $sql;
				
				//$itemsc= erp_item::all(array($sql));
                //$itemsc->limit($limit,$start);
                //$query = $itemsc->get();

                $json=array();
                //$jsonres = '';
                foreach ($itemsc as $cuenta) {
                    //array_push($json, $cuenta);
                    $json[]=$cuenta;
                }
                //print_r($json);
                echo json_encode(array(
                    "success" => 0,
                    "total" => 0,
                    "mageItem" => $json
                ));
				//-$json=substr($json, 0, strlen($json)-1);

				//echo '{"total":"'.(0).'","results":['.$json.']}';
				//-echo '{"total":"0","results":['.$json.']}';
				//echo json_encode(array("total" => 0,"data" => $json));
			break;
		}
	}
}

$xaction=$_POST['xaction'];
 
$item=new sis_app_item();
$item->$xaction($_POST);
?>
